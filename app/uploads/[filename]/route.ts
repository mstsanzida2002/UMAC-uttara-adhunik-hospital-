import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const contentTypes: Record<string, string> = {
  avif: "image/avif",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  if (path.basename(filename) !== filename) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await readFile(path.join(process.cwd(), "public", "uploads", filename));
    const extension = path.extname(filename).slice(1).toLowerCase();

    return new NextResponse(file, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }

    return new NextResponse("Not found", { status: 404 });
  }
}
