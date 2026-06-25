import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/library/article-template";
import { PageShell } from "@/components/site/page-shell";
import {
  getLibraryArticle,
  getLibraryCollection,
  libraryArticles,
} from "@/lib/library";

export function generateStaticParams() {
  return libraryArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getLibraryArticle(slug);

  if (!article) {
    return {
      title: "Library Article Not Found",
    };
  }

  return {
    title: `${article.title} | Foundry Library`,
    description: article.description,
  };
}

export default async function LibraryArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getLibraryArticle(slug);

  if (!article || !getLibraryCollection(article.collectionId)) {
    notFound();
  }

  return (
    <PageShell>
      <ArticleTemplate article={article} />
    </PageShell>
  );
}
