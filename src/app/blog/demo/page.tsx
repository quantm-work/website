import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import { getSiteUrl } from "@/lib/posts";

const PATH = "/blog/demo";
const PUBLISHED = "2026-05-27";

const media = {
  image: {
    url: "https://picsum.photos/seed/quantm-hero/1600/900",
    width: 1600,
    height: 900,
    alt: "Sample editorial hero image",
  },
  video: {
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    type: "video/mp4",
    width: 1280,
    height: 720,
    duration: 15,
    poster: "https://picsum.photos/seed/quantm-video/1600/900",
    name: "Sample product video",
    description: "Demonstration video used to verify SEO video markup.",
  },
  audio: {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    type: "audio/mpeg",
    name: "Sample audio track",
    description: "Demonstration audio used to verify SEO audio markup.",
  },
  carousel: [
    { seed: "flick-1", caption: "Slide 01 — Snap" },
    { seed: "flick-2", caption: "Slide 02 — Scroll" },
    { seed: "flick-3", caption: "Slide 03 — Flick" },
    { seed: "flick-4", caption: "Slide 04 — Done" },
  ],
};

const carouselImage = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/1000`;

const TITLE = "Media post examples — image, video, audio, carousel";
const DESCRIPTION =
  "Reference blog post showing image, video, audio, and flick-carousel media with full SEO, OpenGraph, and schema.org markup.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: false, follow: true },
  openGraph: {
    type: "article",
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    publishedTime: PUBLISHED,
    images: [
      {
        url: media.image.url,
        width: media.image.width,
        height: media.image.height,
        alt: media.image.alt,
      },
    ],
    videos: [
      {
        url: media.video.url,
        type: media.video.type,
        width: media.video.width,
        height: media.video.height,
      },
    ],
    audio: [{ url: media.audio.url, type: media.audio.type }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [media.image.url],
  },
};

export default function BlogMediaDemoPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${PATH}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    image: [media.image.url],
    associatedMedia: [
      {
        "@type": "ImageObject",
        contentUrl: media.image.url,
        width: media.image.width,
        height: media.image.height,
        caption: media.image.alt,
      },
      {
        "@type": "VideoObject",
        name: media.video.name,
        description: media.video.description,
        contentUrl: media.video.url,
        thumbnailUrl: media.video.poster,
        uploadDate: PUBLISHED,
        duration: `PT${media.video.duration}S`,
        width: media.video.width,
        height: media.video.height,
        encodingFormat: media.video.type,
      },
      {
        "@type": "AudioObject",
        name: media.audio.name,
        description: media.audio.description,
        contentUrl: media.audio.url,
        uploadDate: PUBLISHED,
        encodingFormat: media.audio.type,
      },
    ],
  };

  const carouselJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: media.carousel.length,
    itemListElement: media.carousel.map((slide, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ImageObject",
        contentUrl: carouselImage(slide.seed),
        caption: slide.caption,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      { "@type": "ListItem", position: 3, name: TITLE, item: pageUrl },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-8 py-16 space-y-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(carouselJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <header>
          <h1 className="mb-3 font-display text-5xl font-medium">
            Media post examples
          </h1>
          <p className="text-[var(--color-mid)]">
            Image, video, audio, and a CSS-only flick carousel — with full SEO.
          </p>
        </header>

        <article className="space-y-4">
          <h2 className="font-display text-3xl font-medium">Image</h2>
          <figure>
            {/* biome-ignore lint/performance/noImgElement: external demo image, not optimizing through next/image */}
            <img
              src={media.image.url}
              alt={media.image.alt}
              width={media.image.width}
              height={media.image.height}
              loading="lazy"
              decoding="async"
              className="w-full rounded-lg"
            />
            <figcaption className="sr-only">{media.image.alt}</figcaption>
          </figure>
        </article>

        <article className="space-y-4">
          <h2 className="font-display text-3xl font-medium">Video</h2>
          <figure>
            {/* biome-ignore lint/a11y/useMediaCaption: external demo video, no captions track available */}
            <video
              controls
              preload="metadata"
              poster={media.video.poster}
              width={media.video.width}
              height={media.video.height}
              aria-label={media.video.name}
              className="w-full rounded-lg"
            >
              <source src={media.video.url} type={media.video.type} />
            </video>
            <figcaption className="sr-only">
              {media.video.description}
            </figcaption>
          </figure>
        </article>

        <article className="space-y-4">
          <h2 className="font-display text-3xl font-medium">Audio</h2>
          <figure>
            {/* biome-ignore lint/a11y/useMediaCaption: external demo audio, no captions track available */}
            <audio
              controls
              preload="metadata"
              aria-label={media.audio.name}
              className="w-full"
            >
              <source src={media.audio.url} type={media.audio.type} />
            </audio>
            <figcaption className="sr-only">
              {media.audio.description}
            </figcaption>
          </figure>
        </article>

        <article className="space-y-4">
          <h2 className="font-display text-3xl font-medium">Flick carousel</h2>
          <section
            aria-roledescription="carousel"
            aria-label="Flick carousel example"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
          >
            {media.carousel.map((slide, i) => (
              // biome-ignore lint/a11y/useSemanticElements: ARIA carousel pattern uses role="group" on slide
              <figure
                key={slide.seed}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${media.carousel.length}`}
                className="relative shrink-0 snap-start w-[85%] sm:w-[60%] aspect-[4/5] overflow-hidden rounded-lg"
              >
                {/* biome-ignore lint/performance/noImgElement: external demo image, not optimizing through next/image */}
                <img
                  src={carouselImage(slide.seed)}
                  alt={slide.caption}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2 text-sm text-white">
                  {slide.caption}
                </figcaption>
              </figure>
            ))}
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
