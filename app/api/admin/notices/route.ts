import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const headers = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [{ isImportant: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ notices }, { headers });
  } catch (error) {
    console.error("[notices GET]", error);
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500, headers });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, date, content, isImportant, fileUrl } = body;
    if (!title?.trim() || !date?.trim()) {
      return NextResponse.json({ error: "Title and date are required" }, { status: 400, headers });
    }
    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        category: category || "General",
        date: date.trim(),
        content: content?.trim() || "",
        isImportant: Boolean(isImportant),
        fileUrl: fileUrl?.trim() || null,
      },
    });
    return NextResponse.json({ success: true, notice }, { headers });
  } catch (error) {
    console.error("[notices POST]", error);
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500, headers });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, category, date, content, isImportant, fileUrl } = body;
    if (!id || !title?.trim() || !date?.trim()) {
      return NextResponse.json({ error: "ID, title and date are required" }, { status: 400, headers });
    }
    const notice = await prisma.notice.update({
      where: { id },
      data: {
        title: title.trim(),
        category: category || "General",
        date: date.trim(),
        content: content?.trim() || "",
        isImportant: Boolean(isImportant),
        fileUrl: fileUrl?.trim() || null,
      },
    });
    return NextResponse.json({ success: true, notice }, { headers });
  } catch (error) {
    console.error("[notices PATCH]", error);
    return NextResponse.json({ error: "Failed to update notice" }, { status: 500, headers });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400, headers });
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    console.error("[notices DELETE]", error);
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500, headers });
  }
}
