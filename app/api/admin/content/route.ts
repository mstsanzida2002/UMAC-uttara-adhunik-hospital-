import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

// GET all content (optionally filter by section)
export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section");
  try {
    const where = section ? { section } : {};
    const items = await prisma.siteContent.findMany({
      where,
      orderBy: [{ section: "asc" }, { key: "asc" }],
    });
    return NextResponse.json({ items }, { headers: NO_CACHE_HEADERS });
  } catch (err) {
    console.error("[content GET]", err);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// PATCH update a single field
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, value } = body as { key: string; value: string };
    if (!key || value === undefined) {
      return NextResponse.json({ error: "key and value are required" }, { status: 400, headers: NO_CACHE_HEADERS });
    }
    const updated = await prisma.siteContent.update({
      where: { key },
      data: { value },
    });
    return NextResponse.json({ success: true, item: updated }, { headers: NO_CACHE_HEADERS });
  } catch (err) {
    console.error("[content PATCH]", err);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
