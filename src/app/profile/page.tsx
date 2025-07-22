import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  let profileWithUrl = null;
  const { data: rawProfile } = await supabase
    .from("profiles")
    .select("username, full_name, avatar_url") // 'avatar_url' berisi PATH
    .eq("id", user.id)
    .single();

  if (rawProfile) {
    profileWithUrl = { ...rawProfile, publicAvatarUrl: null };

    if (rawProfile.avatar_url) {
      // Jika ada path
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(rawProfile.avatar_url); // Buat URL dari PATH

      profileWithUrl.publicAvatarUrl = urlData.publicUrl;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <ProfileForm user={user} profile={profileWithUrl} />
        </div>
      </div>
    </div>
  );
}
