import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-7xl px-8 py-24">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
