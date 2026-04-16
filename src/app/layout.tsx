import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AnalyticsScripts } from "@/components/consent/analytics-scripts";
import { ConsentBanner } from "@/components/consent/consent-banner";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { EU_UK_EEA_CH_CODES } from "@/lib/consent/region";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "QuantM — We Build the Future of Finance",
  description:
    "QuantM builds AI-powered software for modern finance. Award-caliber execution, luxury design, zero shortcuts.",
  metadataBase: new URL("https://quantm.work"),
  openGraph: {
    title: "QuantM — We Build the Future of Finance",
    description:
      "QuantM builds AI-powered software for modern finance. Award-caliber execution, luxury design, zero shortcuts.",
    url: "https://quantm.work",
    type: "website",
    siteName: "QuantM",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantM — We Build the Future of Finance",
    description:
      "QuantM builds AI-powered software for modern finance. Award-caliber execution, luxury design, zero shortcuts.",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "QuantM" }],
  alternates: { canonical: "https://quantm.work" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuantM",
  url: "https://quantm.work",
  logo: "https://quantm.work/logo.svg",
  description: "AI-powered software for modern finance",
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@quantm.work",
    contactType: "Sales",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does QuantM do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QuantM builds AI-powered software and infrastructure for modern finance companies.",
      },
    },
    {
      "@type": "Question",
      name: "Who is QuantM for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Financial institutions, fintech startups, and enterprises modernizing their technology stack.",
      },
    },
    {
      "@type": "Question",
      name: "How do I work with QuantM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Book a consultation through our website to discuss your project requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies does QuantM use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We specialize in modern web technologies, AI/ML systems, and scalable cloud infrastructure.",
      },
    },
  ],
};

const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',${JSON.stringify(
  {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    region: EU_UK_EEA_CH_CODES,
  },
)});`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentDefaultScript }} />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {children}
        <ConsentProvider>
          <AnalyticsScripts />
          <ConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
