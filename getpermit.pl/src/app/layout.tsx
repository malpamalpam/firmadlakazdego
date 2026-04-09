import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getpermit.pl"),
  robots: { index: true, follow: true },
  // TODO: Stworzyc og:image 1200x630 i umiescic w /public/og-image.jpg
  openGraph: {
    type: "website",
    siteName: "getpermit.pl",
    images: [{ url: "/logo.jpg", width: 600, height: 400, alt: "getpermit.pl" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
