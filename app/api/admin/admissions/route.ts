import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const headers = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function GET() {
  try {
    const items = await prisma.admissionInfo.findMany({
      orderBy: [{ updatedAt: "desc" }, { title: "asc" }],
    });
    return NextResponse.json({ items }, { headers });
  } catch (error) {
    console.error("[admissions GET]", error);
    return NextResponse.json({ error: "Failed to fetch admissions" }, { status: 500, headers });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, downloadUrl } = body;
    if (!title?.trim() || !slug?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Title, section and content are required" }, { status: 400, headers });
    }

    const item = await prisma.admissionInfo.create({
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        content: content.trim(),
        downloadUrl: downloadUrl?.trim() || null,
      },
    });
    return NextResponse.json({ success: true, item }, { headers });
  } catch (error) {
    console.error("[admissions POST]", error);
    return NextResponse.json({ error: "Failed to create admission information" }, { status: 500, headers });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, content, downloadUrl } = body;
    if (!id || !title?.trim() || !slug?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "ID, title, section and content are required" }, { status: 400, headers });
    }

    const item = await prisma.admissionInfo.update({
      where: { id },
      data: {
        title: title.trim(),
        slug: slug.trim().toLowerCase(),
        content: content.trim(),
        downloadUrl: downloadUrl?.trim() || null,
      },
    });
    return NextResponse.json({ success: true, item }, { headers });
  } catch (error) {
    console.error("[admissions PATCH]", error);
    return NextResponse.json({ error: "Failed to update admission information" }, { status: 500, headers });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400, headers });
    await prisma.admissionInfo.delete({ where: { id } });
    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    console.error("[admissions DELETE]", error);
    return NextResponse.json({ error: "Failed to delete admission information" }, { status: 500, headers });
  }
}
