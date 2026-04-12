import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Goldbridge Capital, our investment philosophy, global reach, and long-term approach to capital growth.",
  path: "/about",
  keywords: [
    "about Goldbridge Capital",
    "investment philosophy",
    "wealth strategy",
    "capital growth",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
