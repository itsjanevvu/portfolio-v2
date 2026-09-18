import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { LoadingIntro } from "@/components/LoadingIntro";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Web stand-in for "Figma Hand", the handwriting face used in the About
// polaroid caption (Figma's own font isn't available to self-host).
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const magnaEF = localFont({
  src: "./fonts/MagnaEF-Light.otf",
  variable: "--font-magna-ef",
  weight: "300",
});

export const metadata: Metadata = {
  title: "Jane Wu — Product Design Portfolio",
  description: "Product design & design engineering case studies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${magnaEF.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingIntro />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
