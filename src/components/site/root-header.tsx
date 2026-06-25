"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

const headerlessPrefixes = ["/admin", "/portal", "/login"];

export function RootHeader() {
  const pathname = usePathname();

  if (headerlessPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return <SiteHeader />;
}
