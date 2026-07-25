import type { Metadata, Viewport } from "next";
import { iranYekan } from "@/lib/font";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/home-loader.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://asouda.com"),
  title: {
    default: "آسوده | تولید کننده سرویس خواب مدرن و کلاسیک",
    template: "%s | آسوده",
  },
  description:
    "آسوده تولیدکننده انواع سرویس خواب مدرن، کلاسیک، دو نفره، یک نفره و نوجوان با بهترین کیفیت، طراحی زیبا و ارسال به سراسر ایران.",
  keywords: [
    "سرویس خواب",
    "سرویس خواب مدرن",
    "سرویس خواب کلاسیک",
    "سرویس خواب دو نفره",
    "سرویس خواب یک نفره",
    "سرویس خواب نوجوان",
    "تولید کننده سرویس خواب",
    "خرید سرویس خواب",
    "آسوده",
  ],
  authors: [{ name: "Asouda" }],
  creator: "Asouda",
  publisher: "Asouda",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://asouda.com",
    siteName: "آسوده",
    title: "آسوده | تولید کننده سرویس خواب",
    description:
      "تولید کننده انواع سرویس خواب با طراحی مدرن، کیفیت بالا و ارسال به سراسر ایران.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "آسوده",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آسوده | تولید کننده سرویس خواب",
    description: "تولید کننده انواع سرویس خواب مدرن و کلاسیک با بهترین کیفیت.",
    images: ["/og-image.jpg"],
  },
  category: "Furniture",
  applicationName: "آسوده",
  themeColor: "#5b4c3a", // moved from manual head
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5b4c3a", // optional, you can also keep it in metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html
      lang='fa'
      dir='rtl'
      className={`${iranYekan.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
