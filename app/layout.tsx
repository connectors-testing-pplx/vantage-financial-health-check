import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Financial Health Check | Vantage Wealth Management",
  description:
    "Discover your Financial Health Score in 90 seconds. Get a personalized scorecard across Retirement, Investments, Tax Planning, and Protection — then book a complimentary review with a Vantage advisor.",
  keywords: [
    "financial health check",
    "financial assessment",
    "wealth management Kitchener",
    "retirement planning",
    "TFSA RRSP",
    "Vantage Wealth Management",
  ],
  openGraph: {
    title: "Financial Health Check | Vantage Wealth Management",
    description:
      "Discover your Financial Health Score in 90 seconds and know exactly where you stand.",
    url: "https://vantagewealth.ca",
    siteName: "Vantage Wealth Management",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
