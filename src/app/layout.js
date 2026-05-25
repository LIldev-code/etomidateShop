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
  metadataBase: new URL("https://etomidateshop.com"),
  title: {
    default: "Etomidate Shop — Premium Powder, K-Pods Vape & Liquid | EtomidateShop.com",
    template: "%s | EtomidateShop.com",
  },
  description:
    "EtomidateShop.com — Premium etomidate powder, K-Pods vape cartridges & liquid solutions. Lab-tested ≥99.8% purity. COA certified, discreet worldwide shipping within 24h.",
  keywords: [
    "buy etomidate online",
    "etomidate for sale",
    "order etomidate",
    "etomidate shop",
    "etomidate store",
    "etomidate powder",
    "buy etomidate powder",
    "etomidate powder for sale",
    "pure etomidate powder",
    "pharmaceutical grade etomidate powder",
    "etomidate vape",
    "etomidate vape pods",
    "etomidate K-Pods",
    "buy etomidate K-Pods",
    "etomidate vape cartridge",
    "etomidate disposable vape",
    "etomidate liquid solution",
    "buy etomidate liquid",
    "etomidate liquid for sale",
    "etomidate",
    "etomidate supplier",
    "etomidate vendor",
    "pharmaceutical grade etomidate",
    "research grade etomidate",
    "lab tested etomidate",
    "etomidate 99.8 purity",
    "etomidate COA certified",
    "HPLC tested etomidate",
    "discreet etomidate shipping",
    "etomidate worldwide delivery",
    "etomidate bulk order",
    "etomidate wholesale",
    "etomidate research chemical",
    "etomidate anesthetic compound",
    "etomidate 33125-97-2",
    "33125-97-2",
    "CAS 33125-97-2",
    "CAS number 33125-97-2",
    "buy 33125-97-2",
    "33125-97-2 for sale",
    "33125-97-2 powder",
    "33125-97-2 buy online",
    "etomidate CAS number",
    "zombie vape",
    "buy zombie vape",
    "zombie vape pods",
    "zombie K-Pod",
    "piao piao vape",
    "buy piao piao vape",
    "piao piao pods",
    "piao piao K-Pod",
    "cychlorphine",
    "cychlorphine HCL",
    "cychlorphine HCL powder",
    "buy cychlorphine HCL",
    "cychlorphine 16145-71-4",
    "16145-71-4",
    "CAS 16145-71-4",
    "buy 16145-71-4",
    "16145-71-4 powder",
    "16145-71-4 for sale",
    "EtomidateShop",
    "etomidateshop.com",
    "space oil",
    "buy space oil",
    "space oil vape",
    "space oil pods",
    "etomidate e-liquid",
    "etomidate e-liquids",
    "etomidate flavours",
    "etomidate flavored pods",
    "etomidate menthol pods",
    "etomidate oil",
    "etomidate oil for sale",
    "etomidate drops",
    "etomidate solution drops",
    "etomidate nasal spray",
    "etomidate oral solution",
    "etomidate concentrate",
    "space pods",
    "research chemical vape",
    "pharmaceutical vape pods",
  ],
  authors: [{ name: "EtomidateShop.com" }],
  creator: "EtomidateShop.com",
  publisher: "EtomidateShop.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://etomidateshop.com",
    siteName: "EtomidateShop.com",
    title: "Etomidate Shop — Premium Powder, K-Pods Vape & Liquid",
    description:
      "EtomidateShop.com — Premium etomidate powder, K-Pods vape cartridges & liquid. ≥99.8% purity, COA included, discreet worldwide shipping.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etomidate Shop — Premium Powder, Vape & Liquid",
    description:
      "EtomidateShop.com — Premium etomidate powder, K-Pods vape cartridges & liquid. Lab-tested ≥99.8% purity. Ships worldwide within 24h.",
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
    canonical: "https://etomidateshop.com",
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
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a14d1044442d91c3266d47b/1jpgl0v3i';
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
