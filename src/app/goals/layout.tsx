import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Financial Goals",
  description:
    "Private Goldbridge Capital financial goals dashboard for registered clients.",
  path: "/goals",
  noIndex: true,
});

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
