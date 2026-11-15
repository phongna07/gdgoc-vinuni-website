import type { Metadata } from "next";
import site from "@/content/site.json";
import type { Img } from "./types";

// Static exports resolve metadata during the build. Set SITE_URL in the host's
// build environment; local development does not need a production domain.
export const siteUrl = new URL(process.env.SITE_URL?.trim() || "http://localhost:3000");

const socialImage = {
  url: "/images/social-preview.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
  type: "image/png",
};

export function pageMetadata({
  path,
  title,
  description = site.description,
  image,
  type = "website",
}: {
  path: string;
  title: string;
  description?: string;
  image?: Img | null;
  type?: "website" | "article";
}): Metadata {
  const shareTitle = path === "/" ? title : `${title} · ${site.shortName}`;
  const images = image
    ? [{ url: image.src, width: image.width, height: image.height, alt: title }]
    : [socialImage];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_US",
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
  };
}
