import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const headers = { "Cache-Control": "no-store, no-cache, must-revalidate" };

export async function GET() {
  try {
    const jobs = await prisma.jobPosting.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
    return NextResponse.json({ jobs }, { headers });
  } catch (error) {
    console.error("[jobs GET]", error);
    return NextResponse.json({ error: "Failed to fetch job postings" }, { status: 500, headers });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, department, type, deadline, requirements, isPublished } = body;
    if (!title?.trim() || !department?.trim() || !deadline?.trim() || !requirements?.trim()) {
      return NextResponse.json({ error: "Title, department, deadline, and requirements are required" }, { status: 400, headers });
    }
    const job = await prisma.jobPosting.create({
      data: {
        title: title.trim(),
        department: department.trim(),
        type: type?.trim() || "Full-time",
        deadline: deadline.trim(),
        requirements: requirements.trim(),
        isPublished: isPublished !== false,
      },
    });
    return NextResponse.json({ success: true, job }, { headers });
  } catch (error) {
    console.error("[jobs POST]", error);
    return NextResponse.json({ error: "Failed to create job posting" }, { status: 500, headers });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, department, type, deadline, requirements, isPublished } = body;
    if (!id || !title?.trim() || !department?.trim() || !deadline?.trim() || !requirements?.trim()) {
      return NextResponse.json({ error: "ID, title, department, deadline, and requirements are required" }, { status: 400, headers });
    }
    const job = await prisma.jobPosting.update({
      where: { id },
      data: {
        title: title.trim(),
        department: department.trim(),
        type: type?.trim() || "Full-time",
        deadline: deadline.trim(),
        requirements: requirements.trim(),
        isPublished: isPublished !== false,
      },
    });
    return NextResponse.json({ success: true, job }, { headers });
  } catch (error) {
    console.error("[jobs PATCH]", error);
    return NextResponse.json({ error: "Failed to update job posting" }, { status: 500, headers });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400, headers });
    await prisma.jobPosting.delete({ where: { id } });
    return NextResponse.json({ success: true }, { headers });
  } catch (error) {
    console.error("[jobs DELETE]", error);
    return NextResponse.json({ error: "Failed to delete job posting" }, { status: 500, headers });
  }
}
