import type { Metadata } from "next";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

const fallbackSiteUrl = "https://goldbridge.capital";
const deployedSiteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  deployedSiteUrl ||
  fallbackSiteUrl;

function normalizeSiteUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteName = "Goldbridge Capital";
export const siteUrl = normalizeSiteUrl(configuredSiteUrl);
export const defaultDescription =
  "Goldbridge Capital is an investment platform focused on disciplined portfolio strategy, transparent reporting, and long-term capital growth.";
export const defaultKeywords = [
  "Goldbridge Capital",
  "investment platform",
  "wealth management",
  "portfolio strategy",
  "capital growth",
  "financial planning",
  "asset management",
];
export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION ||
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  undefined;

export const publicSiteRoutes: Array<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}> = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/trust",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/privacy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export function absoluteUrl(path: string = "/") {
  if (!path || path === "/") {
    return siteUrl;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = defaultKeywords,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const imageUrl = absoluteUrl("/logo.png");

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    description: defaultDescription,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    description: defaultDescription,
  };
}
