import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import {
  absoluteUrl,
  defaultDescription,
  defaultKeywords,
  getOrganizationSchema,
  getWebsiteSchema,
  googleSiteVerification,
  siteName,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} | Premium Asset Management`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  referrer: "origin-when-cross-origin",
  creator: siteName,
  publisher: siteName,
  category: "finance",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${siteName} | Premium Asset Management`,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl("/logo.png"),
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${siteName} | Premium Asset Management`,
    description: defaultDescription,
    images: [absoluteUrl("/logo.png")],
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#060608",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = [getOrganizationSchema(), getWebsiteSchema()];

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
