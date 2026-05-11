import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAllSlugs } from "@/lib/blog";
import ArticlePage from "./ArticlePage";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Webbly`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      url: `https://webbly.no/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [{ url: `https://webbly.no${post.coverImage}`, width: 1200, height: 630 }],
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://webbly.no/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `https://webbly.no${post.coverImage}`,
    author: {
      "@type": "Organization",
      name: "Webbly",
      url: "https://webbly.no",
    },
    publisher: {
      "@type": "Organization",
      name: "Webbly",
      url: "https://webbly.no",
      logo: {
        "@type": "ImageObject",
        url: "https://webbly.no/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://webbly.no/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlePage post={post} />
    </>
  );
}
