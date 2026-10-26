import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET() {
  try {
    const images = await prisma.siteImage.findMany({
      orderBy: [{ category: "asc" }, { label: "asc" }],
    });
    return NextResponse.json({ images }, { headers: NO_CACHE_HEADERS });
  } catch (err) {
    console.error("[images] error:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
