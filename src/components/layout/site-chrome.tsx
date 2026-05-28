import { hasPublishedPosts } from "@/lib/posts";
import Footer from "./footer";
import Header from "./header";

export async function SiteHeader() {
  const showBlog = await hasPublishedPosts();
  return <Header showBlog={showBlog} />;
}

export async function SiteFooter() {
  const showBlog = await hasPublishedPosts();
  return <Footer showBlog={showBlog} />;
}
