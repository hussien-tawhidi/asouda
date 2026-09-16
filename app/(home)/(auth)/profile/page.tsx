"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log("🚀 ~ ProfilePage ~ session:", session);
  const router = useRouter();

  if (!session) {
    return router.push("/signin");
  }

  return (
    <main
      className='min-h-screen bg-bone-white/40 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='grid gap-6 lg:grid-cols-[350px_1fr]'>
        {/* Sidebar */}
        <ProfileSidebar />

        {/* Main content */}
        <ProfileOverview />
      </div>
    </main>
  );
}
