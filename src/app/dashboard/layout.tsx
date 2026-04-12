import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dashboard",
  description:
    "Private Goldbridge Capital investor dashboard for registered clients.",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
