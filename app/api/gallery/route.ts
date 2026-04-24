import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
    const imageKey = typeof body.imageKey === "string" ? body.imageKey.trim() : undefined;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { message: "Title dan imageUrl harus diisi." },
        { status: 400 },
      );
    }

    const gallery = await prisma.gallery.create({
      data: { title, imageUrl, imageKey },
    });

    return NextResponse.json({ ok: true, gallery });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal membuat data gallery.", error: String(error) },
      { status: 500 },
    );
  }
}
