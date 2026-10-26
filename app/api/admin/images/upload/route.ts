import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
import { writeFile, mkdir, rm } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const key = formData.get("key") as string | null;

    if (!file || !key) {
      return NextResponse.json({ error: "File and key are required" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 10MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const timestamp = Date.now();
    const newFilename = `${key}-${timestamp}.${ext}`;
    let newUrl: string;

    if (process.env.NODE_ENV === "production") {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return NextResponse.json(
          { error: "Image storage is not configured. Add BLOB_READ_WRITE_TOKEN in Vercel." },
          { status: 503 }
        );
      }

      const blob = await put(`uploads/${newFilename}`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.type,
      });
      newUrl = blob.url;
    } else {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      await writeFile(path.join(uploadsDir, newFilename), buffer);
      newUrl = `/uploads/${newFilename}`;
    }

    if (process.env.NODE_ENV !== "production") {
      const existingRecord = await prisma.siteImage.findUnique({ where: { key } });
      if (existingRecord?.url?.startsWith("/")) {
        const originalPath = path.join(process.cwd(), "public", existingRecord.url.slice(1));
        await mkdir(path.dirname(originalPath), { recursive: true });
        await writeFile(originalPath, buffer);
      }
    }

    if (process.env.NODE_ENV !== "production") {
      const nextImageCacheDir = path.join(process.cwd(), ".next", "cache", "images");
      if (existsSync(nextImageCacheDir)) {
        try {
          await rm(nextImageCacheDir, { recursive: true, force: true });
        } catch {
          console.warn("[upload] unable to clear local image cache");
        }
      }
    }

    const image = await prisma.siteImage.upsert({
      where: { key },
      update: { url: newUrl },
      create: { key, label: key, category: "General", url: newUrl },
    });

    return NextResponse.json({ success: true, url: image.url });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
