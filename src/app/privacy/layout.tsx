import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Read the Goldbridge Capital privacy policy and how personal data is collected, used, and protected.",
  path: "/privacy",
  keywords: ["Goldbridge Capital privacy policy", "data privacy", "personal data protection"],
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
