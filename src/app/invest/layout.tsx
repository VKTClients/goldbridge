import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Invest",
  description:
    "Private Goldbridge Capital investment workflow for registered clients.",
  path: "/invest",
  noIndex: true,
});

export default function InvestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
