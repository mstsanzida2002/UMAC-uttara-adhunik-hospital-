import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

    // 1. Save with timestamp to /public/uploads/ to bust browser & Next.js image cache
    const timestamp = Date.now();
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const newFilename = `${key}-${timestamp}.${ext}`;
    await writeFile(path.join(uploadsDir, newFilename), buffer);
    const newUrl = `/uploads/${newFilename}`;

    // 2. ALSO overwrite the original file path (for hardcoded <Image src="..."> references)
    const existingRecord = await prisma.siteImage.findUnique({ where: { key } });
    if (existingRecord?.url) {
      const relPath = existingRecord.url.replace(/^\//, "");
      const originalPath = path.join(process.cwd(), "public", relPath);
      const originalDir = path.dirname(originalPath);
      try {
        await mkdir(originalDir, { recursive: true });
        await writeFile(originalPath, buffer);
      } catch {
        // ignore if original path is read-only or missing
      }
    }

    // 3. Overwrite original seeded paths (e.g. /images/hero-bg.jpg) based on known key→path map
    const KEY_TO_ORIGINAL_PATH: Record<string, string> = {
      "hero-bg":           "images/hero-bg.jpg",
      "about-1":           "images/about-1.jpg",
      "about-2":           "images/about-2.jpg",
      "about-banner":      "images/about-banner.jpg",
      "principal-photo":   "images/principal-photo.jpg",
      "principal-signature": "images/principal-signature.png",
      "facility-hostel":   "images/facility-hostel.jpg",
      "finddept-bg":       "images/finddept-bg.jpg",
      "finddept-doctor":   "images/finddept-doctor.jpg",
      "finddept-student1": "images/finddept-student1.jpg",
      "finddept-student2": "images/finddept-student2.jpg",
      "admission-bg":      "images/admission-bg.jpg",
      "admission-aid-bg":  "images/admission-aid-bg.jpg",
      "metrics-bg":        "images/metrics-bg.jpg",
      "sustainability-1":  "images/sustainability-1.jpg",
      "sustainability-2":  "images/sustainability-2.jpg",
      "visit-uamc-bg":     "images/visit-uamc-bg.jpg",
      "footer-post-1":     "images/footer-post-1.webp",
      "footer-post-2":     "images/footer-post-2.webp",
      "logo":              "images/uamc-logo-round.png",
      "college-emblem":    "assets/college-emblem.png",
    };

    const originalRel = KEY_TO_ORIGINAL_PATH[key];
    if (originalRel) {
      const originalAbsPath = path.join(process.cwd(), "public", originalRel);
      try {
        await mkdir(path.dirname(originalAbsPath), { recursive: true });
        await writeFile(originalAbsPath, buffer);
      } catch {
        // ignore
      }
    }

    // 4. Clear Next.js image optimizer cache so new file is served immediately
    const nextImageCacheDir = path.join(process.cwd(), ".next", "cache", "images");
    if (existsSync(nextImageCacheDir)) {
      try {
        await rm(nextImageCacheDir, { recursive: true, force: true });
      } catch {
        // ignore — dev server will recreate it
      }
    }

    // 5. Update DB with new timestamped URL
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
