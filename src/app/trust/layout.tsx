import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Trust And Security",
  description:
    "See how Goldbridge Capital approaches security, compliance, transparency, and investor protection.",
  path: "/trust",
  keywords: [
    "Goldbridge Capital security",
    "investment transparency",
    "investor protection",
    "compliance",
  ],
});

export default function TrustLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
