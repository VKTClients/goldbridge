import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Referral Program",
  description:
    "Goldbridge Capital referral program for existing clients and invited users.",
  path: "/referrals",
  noIndex: true,
});

export default function ReferralsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
