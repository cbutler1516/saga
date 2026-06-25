import { SiteHeader } from "@/components/site/site-header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
