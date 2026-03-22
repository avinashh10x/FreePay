import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FreePay | Instant Crypto Payment Links on Starknet",
    template: "%s | FreePay"
  },
  description: "Create and share non-custodial crypto payment links in seconds. Powered by Starknet Layer 2 for gas-efficient, instant, and secure global payments.",
  keywords: ["Starknet", "Crypto Payments", "Payment Links", "Web3", "Blockchain", "Freelancer Payments", "STRK", "Ethereum L2", "FreePay"],
  authors: [{ name: "Avinash", url: "https://github.com/Avinashh10x" }],
  creator: "Avinash",
  publisher: "FreePay",
  metadataBase: new URL("https://freepaynow.vercel.app" ), // Placeholder, adjust if needed
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FreePay - The Easiest Way to Get Paid in Crypto",
    description: "No setup, no friction. Generate a simple link to receive payments directly into your Starknet wallet.",
    url: "https://freepaynow.vercel.app",
    siteName: "FreePay",
    images: [
      {
        url: "/og-image.png", // User should provide this, but I'll set the path
        width: 1200,
        height: 630,
        alt: "FreePay - Crypto Payment Links",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreePay | Crypto Payment Links",
    description: "Get paid in crypto via a simple link on Starknet. Fast, secure, and gas-efficient.",
    creator: "@Avinashh10x",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

import { StarkZapProvider } from "@/providers/StarkZapProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${manrope.variable} dark`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-[#0a0a0f] text-[#e4e1e9]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FreePay",
              "url": "https://freepaynow.vercel.app",
              "description": "Instant crypto payment links on Starknet. Create and share non-custodial payment requests.",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "All",
              "author": {
                "@type": "Person",
                "name": "Avinash"
              },
              "offers": {
                "@type": "Offer",
                "price": "0"
              }
            })
          }}
        />
        <StarkZapProvider>
          {children}
          <Toaster />
        </StarkZapProvider>
      </body>
    </html>
  );
}
