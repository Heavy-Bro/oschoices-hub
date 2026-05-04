import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OSChoices — Smart tools for smarter choices.",
    template: "%s | OSChoices",
  },
  description:
    "OSChoices is a portfolio of indie web tools built to make everyday decisions easier. Free, fast, and focused.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://oschoices.com"
  ),
  openGraph: {
    siteName: "OSChoices",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Cal Sans from Fontshare */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cal-sans@1&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics 4 — production only */}
        {gaId && process.env.NODE_ENV === "production" && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
