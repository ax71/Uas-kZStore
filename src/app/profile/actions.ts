"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: "User not authenticated." };
  }

  const fullName = formData.get("fullName") as string;
  const username = formData.get("username") as string;
  const avatarFile = formData.get("avatar") as File;

  const profileData: {
    full_name: string;
    username: string;
    avatar_url?: string; // Kolom ini akan berisi PATH
  } = {
    full_name: fullName,
    username: username,
  };

  // Handle Avatar Upload
  if (avatarFile && avatarFile.size > 0) {
    const fileExt = avatarFile.name.split(".").pop();
    // Buat path yang unik, misalnya di dalam folder dengan ID user
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return {
        success: false,
        message: `Database error: ${uploadError.message}`,
      };
    }

    // ==========================================================
    // PERBAIKAN UTAMA DI SINI
    // Jangan ambil publicUrl, langsung simpan filePath-nya.
    profileData.avatar_url = filePath;
    // ==========================================================
  }

  // Update data di tabel 'profiles'
  const { error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", user.id);

  if (error) {
    console.error("Update error:", error);
    return { success: false, message: `Database error: ${error.message}` };
  }

  // Revalidate path untuk menyegarkan data di UI
  revalidatePath("/profile");
  revalidatePath("/"); // Revalidate halaman utama juga untuk update Navbar

  return { success: true, message: "Profile updated successfully!" };
}
