import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FoundryChatLoader } from "@/components/chat/foundry-chat-loader";
import { corePositioning, siteKeywords } from "@/lib/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Foundry — Own the Company. Keep Selling.",
    template: "%s | Foundry",
  },
  description: corePositioning,
  keywords: [...siteKeywords],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#E6E6E6] antialiased">
        {children}
        <FoundryChatLoader />
      </body>
    </html>
  );
}
