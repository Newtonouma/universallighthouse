import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      {/* <Head>
      <script src="https://www.paypal.com/sdk/js?client-id=Adi5g3BpyHgDydtG4WfbRl-aEDnk1bTGJLPv_CsuYKGr0HeQ6apbYbCGC7TzVcqzOLLNQeYzyJVIQ_kN&currency=USD"></script>
      
      </Head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
