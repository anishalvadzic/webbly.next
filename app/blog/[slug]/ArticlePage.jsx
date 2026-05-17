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

function renderBlock(block, i) {
  switch (block.type) {
    case "heading2":
      return (
        <h2
          key={i}
          className="font-display text-2xl md:text-3xl font-semibold text-deep-brown mt-12 mb-4"
        >
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3
          key={i}
          className="font-display text-xl font-semibold text-deep-brown mt-8 mb-3"
        >
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          key={i}
          className="font-body text-base text-warm-brown/85 leading-relaxed mb-4"
        >
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="mb-4 space-y-1.5 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 font-body text-base text-warm-brown/85">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-warm-brown/40 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "divider":
      return <hr key={i} className="my-8 border-beige-200" />;
    case "faq":
      return (
        <div key={i} className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-deep-brown mb-6">
            FAQ
          </h2>
          <div className="space-y-5">
            {block.items.map((item, j) => (
              <div key={j} className="bg-beige-100/60 border border-beige-200 rounded-2xl px-6 py-5">
                <p className="font-display text-base font-semibold text-deep-brown mb-2">
                  {item.q}
                </p>
                <p className="font-body text-sm text-warm-brown/80 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function ArticlePage({ post }) {
  const [lang, setLang] = useState("no");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-beige-50">
      <Navbar lang={lang} setLang={setLang} />

      {/* Cover — sits below the fixed navbar */}
      <div className="relative w-full mt-16 aspect-video md:aspect-[21/9] overflow-hidden bg-beige-200">
        {post.coverAnimation ? (
          <BlogCoverAnimation variant={post.coverAnimation} />
        ) : (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-14">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-body text-xs text-warm-brown/60 hover:text-deep-brown transition-colors mb-8"
        >
          ← Blogg
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-deep-brown text-beige-50 text-[10px] font-body font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="font-body text-xs text-warm-brown/50">
            {format(parseISO(post.date), "d. MMMM yyyy", { locale: nb })}
          </span>
          <span className="font-body text-xs text-warm-brown/30">·</span>
          <span className="font-body text-xs text-warm-brown/50">
            {readingTime(post)} min lesing
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-deep-brown leading-tight mb-8">
          {post.title}
        </h1>

        <hr className="border-beige-200 mb-10" />

        {/* Article body */}
        <div>{post.content.map((block, i) => renderBlock(block, i))}</div>

        {/* CTA */}
        <div className="mt-14 bg-deep-brown rounded-2xl p-8 text-center">
          <p className="font-display text-xl font-semibold text-beige-50 mb-2">
            Trenger du en nettside?
          </p>
          <p className="font-body text-sm text-beige-300 mb-6">
            Vi leverer profesjonelle nettsider på tre virkedager. Kom i gang i dag.
          </p>
          <Link
            href="/#pricing"
            className="inline-block bg-beige-50 text-deep-brown font-body text-sm font-medium px-6 py-3 rounded-xl hover:bg-beige-100 transition-colors"
          >
            Se pakker og priser →
          </Link>
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
