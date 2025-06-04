import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "../contexts/LoadingContext";
import GlobalLoadingWrapper from "../../components/ui/GlobalLoadingWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Universal Lighthouse",
  icons: "/images/Logo.png",
  keywords: [
    "Universal Lighthouse",
    "Non-profit",
    "Charity",
    "Community Based Organization",
    "Charity organizations in kenya",
    "Non-profit organizations in kenya",
    "Community organizations in kenya",
    "Non-profit organizations",
    "Charity organizations",
    "Community organizations",
    "Non-profit",
  ],
  description: "Non-profit organizations in kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <GlobalLoadingWrapper>
            {children}
          </GlobalLoadingWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
