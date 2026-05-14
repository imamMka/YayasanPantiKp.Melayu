import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [newsCount, galleryCount] = await Promise.all([
      prisma.news.count(),
      prisma.gallery.count(),
    ]);

    const recentNews = await prisma.news.findMany({
      take: 3,
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({
      newsCount,
      galleryCount,
      recentNews
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
