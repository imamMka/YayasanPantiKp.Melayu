import ArticleEditor from "@/components/ArticleEditor";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { News } from "@prisma/client";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article: News | null = await prisma.news.findUnique({
    where: { id: Number(id) },
  });

  if (!article) {
    notFound();
  }

  return <ArticleEditor initialData={article} />;
}
