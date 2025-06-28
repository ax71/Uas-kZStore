import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

// Definisikan fungsi createClient untuk digunakan di komponen sisi server.
export const createClient = () => {
  // Ambil cookie store dari Next.js
  const cookieStore = cookies();

  // Buat dan kembalikan client Supabase
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Sediakan fungsi untuk mendapatkan cookie
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // Anda juga bisa menyediakan fungsi set dan remove di sini
        // jika Anda akan menggunakan Server Actions untuk login/logout.
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Cookie hanya bisa di-set dalam Server Actions atau Route Handlers.
            // Jika Anda mencoba menggunakannya di Server Component, ini akan error.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Sama seperti 'set', ini hanya bekerja di Server Actions/Route Handlers.
          }
        },
      },
    }
  );
};
