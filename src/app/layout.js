import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import SocialFloat from "@/components/SocialFloat";
import ImageProtection from "@/components/ImageProtection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://buyetomidateproducts.com"),
  title: {
    default: "Buy Etomidate Products — Powder, K-Pods Vape & Liquid | BuyEtomidateProducts.com",
    template: "%s | BuyEtomidateProducts.com",
  },
  description:
    "Buy etomidate powder, K-Pods vape cartridges & liquid solutions online. Lab-tested ≥99.8% purity. Etomidate K-Pods, etomidate vape, etomidate powder — COA certified, discreet worldwide shipping.",
  keywords: [
    "etomidate",
    "buy etomidate",
    "buy etomidate online",
    "etomidate online",
    "etomidate powder",
    "etomidate-powder-pure",
    "etomidate-powder-research",
    "etomidate-powder-ultra-fine",
    "etomidate-powder-bulk",
    "etomidate-powder-pharma-grade",
    "etomidate-powder-sample-kit",
    "etomidate vape",
    "etomidate-vape-kpod-classic",
    "etomidate-vape-kpod-strong",
    "etomidate-vape-disposable-mini",
    "etomidate-vape-kpod-menthol",
    "etomidate-vape-starter-kit",
    "etomidate-vape-kpod-max",
    "etomidate K-Pods",
    "K-Pods vape",
    "K-Pods etomidate",
    "buy K-Pods",
    "etomidate liquid",
    "etomidate-liquid-solution-standard",
    "etomidate-liquid-concentrate",
    "etomidate-liquid-injectable-grade",
    "etomidate-liquid-oral-solution",
    "etomidate-liquid-nasal-spray",
    "etomidate-liquid-dropper-bottle",
    "etomidate cartridge",
    "etomidate vape cartridge",
    "research chemicals",
    "pharmaceutical grade etomidate",
    "lab tested etomidate",
    "COA certified",
    "discreet shipping",
    "buy research chemicals online",
    "etomidate for sale",
    "order etomidate",
    "etomidate delivery",
    "etomidate worldwide shipping",
    "pure etomidate",
    "etomidate supplier",
    "etomidate vendor",
    "etomidate store",
    "etomidate shop",
    "etomidate products",
    "etomidate crystals",
    "etomidate synthesis",
    "etomidate anesthesia",
    "etomidate research",
    "etomidate laboratory",
    "etomidate chemical",
    "etomidate compound",
  ],
  authors: [{ name: "BuyEtomidateProducts.com" }],
  creator: "BuyEtomidateProducts.com",
  publisher: "BuyEtomidateProducts.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buyetomidateproducts.com",
    siteName: "BuyEtomidateProducts.com",
    title: "Buy Etomidate Products — Powder, K-Pods Vape & Liquid",
    description:
      "Buy etomidate powder, K-Pods vape cartridges & liquid solutions. ≥99.8% purity, COA included, discreet worldwide shipping within 24h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Etomidate & K-Pods Online — Powder, Vape & Liquid",
    description:
      "Buy etomidate powder, K-Pods vape cartridges & liquid online. Lab-tested ≥99.8% purity. Ships worldwide within 24 hours.",
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
  alternates: {
    canonical: "https://buyetomidateproducts.com",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  verification: {
    google: "6uz5n6ngf_ozH4xgFtl0Clt_Tm2OBYScFmgYVpqS5gk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ImageProtection />
        <ToastProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SocialFloat />
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/69f7a0af986f9c1c33e84fcb/1jnnknd9q';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
