"use client";

import dynamic from "next/dynamic";

const FoundryChatWidget = dynamic(
  () =>
    import("./foundry-chat-widget").then((mod) => mod.FoundryChatWidget),
  { ssr: false },
);

export function FoundryChatLoader() {
  return <FoundryChatWidget />;
}
