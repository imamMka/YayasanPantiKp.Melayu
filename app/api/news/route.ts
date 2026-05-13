import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const quote = typeof body.quote === "string" ? body.quote.trim() : undefined;
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
    const imageKey = typeof body.imageKey === "string" ? body.imageKey.trim() : undefined;
    const category = typeof body.category === "string" ? body.category.trim() : "Umum";
    
    // Generate slug if not provided
    const slug = typeof body.slug === "string" && body.slug.trim() 
      ? body.slug.trim().toLowerCase().replace(/\s+/g, '-')
      : title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

    if (!title || !content || !imageUrl) {
      return NextResponse.json(
        { message: "Title, content, dan imageUrl harus diisi." },
        { status: 400 },
      );
    }

    const news = await prisma.news.create({
      data: { title, slug, category, content, quote, imageUrl, imageKey },
    });

    return NextResponse.json({ ok: true, news });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal membuat data berita.", error: String(error) },
      { status: 500 },
    );
  }
}
