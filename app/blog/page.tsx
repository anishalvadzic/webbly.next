import type { Metadata } from "next";
import { posts } from "@/lib/blog";
import BlogListPage from "./BlogListPage";

export const metadata: Metadata = {
  title: "Blogg — Webbly",
  description:
    "Tips, guider og innsikt om nettsider, SEO og digital tilstedeværelse for norske bedrifter.",
  openGraph: {
    url: "https://webbly.no/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://webbly.no/blog",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <BlogListPage posts={posts} />;
}
