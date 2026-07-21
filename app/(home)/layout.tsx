import type {  Viewport } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";


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
    <main>
      <Header />
      <section className='mb-16 md:pt-0 pt-20'>
        {children}
        <Footer />
      </section>
    </main>
  );
}
