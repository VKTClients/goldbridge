import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms And Conditions",
  description:
    "Read the Goldbridge Capital terms and conditions covering eligibility, platform usage, and important legal disclosures.",
  path: "/terms",
  keywords: ["Goldbridge Capital terms", "terms and conditions", "legal disclosures"],
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
