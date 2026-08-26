import { auth } from "@/auth";
import type { Viewport } from "next";
import { redirect } from "next/navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5b4c3a", // optional, you can also keep it in metadata
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

 if (!session) {
   redirect("/signin");
 }

 if (session.user.role !== "admin") {
   redirect("/access-denied");
 }
  return <div className="bg-dark-bg min-h-screen">{children}</div>;
}
