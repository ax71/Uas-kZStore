// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kz Store | Gaming Store",
  description:
    "Discover the latest games, consoles, and accessories at kz Store. Your one-stop shop for all things gaming.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileWithUrl = null;
  if (user) {
    const { data: rawProfile } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single();

    if (rawProfile) {
      profileWithUrl = { ...rawProfile, publicAvatarUrl: null };
      if (rawProfile.avatar_url) {
        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(rawProfile.avatar_url);
        profileWithUrl.publicAvatarUrl = urlData.publicUrl;
      }
    }
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-900 flex flex-col min-h-screen`}
      >
        <Navbar user={user} profile={profileWithUrl} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
