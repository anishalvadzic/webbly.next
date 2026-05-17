"use client";

import { useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { nb } from "date-fns/locale";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CookieBanner from "@/components/landing/CookieBanner";
import BlogCoverAnimation from "@/components/blog/BlogCoverAnimation";
import { readingTime } from "@/lib/blog";

function ArticleCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white border border-beige-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      <div className="aspect-[16/9] overflow-hidden bg-beige-100 relative">
        {post.coverAnimation ? (
          <BlogCoverAnimation variant={post.coverAnimation} />
        ) : (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        )}
        <span className="absolute top-3 left-3 bg-deep-brown/80 text-beige-50 text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="font-body text-xs text-warm-brown/50 mb-3 flex items-center gap-2">
          <span>{format(parseISO(post.date), "d. MMMM yyyy", { locale: nb })}</span>
          <span>·</span>
          <span>{readingTime(post)} min lesing</span>
        </p>
        <h2 className="font-display text-lg font-semibold text-deep-brown mb-2 leading-snug group-hover:text-warm-brown transition-colors">
          {post.title}
        </h2>
        <p className="font-body text-sm text-warm-brown/70 leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <span className="mt-4 font-body text-xs font-semibold text-deep-brown group-hover:text-warm-brown transition-colors">
          Les mer →
        </span>
      </div>
    </Link>
  );
}

export default function BlogListPage({ posts }) {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-beige-50 flex flex-col">
      <Navbar lang={lang} setLang={setLang} />

      <div className="flex-1 max-w-5xl mx-auto w-full px-6 pt-32 pb-24">
        <div className="mb-14">
          <span className="block text-xs font-body font-semibold tracking-widest uppercase text-beige-400 mb-4">
            Blogg
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-deep-brown mb-4">
            Innsikt og guider.
          </h1>
          <p className="font-body text-warm-brown/70 max-w-xl">
            Tips, guider og innsikt om nettsider, SEO og digital tilstedeværelse
            for norske bedrifter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <Footer lang={lang} onOpenCookieSettings={() => setCookieSettingsOpen(true)} />
      <CookieBanner
        lang={lang}
        forceOpen={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
      />
    </div>
  );
}
