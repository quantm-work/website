import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-7xl px-8 py-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
