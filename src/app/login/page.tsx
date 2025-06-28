// src/app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Error logging in:", error);
      setError(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative flex w-full max-w-4xl mx-auto overflow-hidden bg-gray-800 rounded-lg shadow-xl">
        <div className="relative hidden w-1/2 md:block">
          <Image
            src="/images/login/login-image.jpg"
            alt="Gaming background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 p-8 text-white flex flex-col justify-center">
            <div>
              <h2 className="text-3xl font-bold">kZStore</h2>
              <p className="mt-4 text-xl font-light tracking-wider">
                YOU WANT <span className="font-bold">MOST GAMES</span> IN HERE
              </p>
            </div>
            <p className="text-sm">Discover a new world of gaming with us.</p>
          </div>
        </div>

        <div className="w-full p-8 md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700">
          <h2 className="text-2xl font-bold text-white text-center">
            Sign in to the site
          </h2>
          <p className="text-center text-blue-100 mt-2 mb-8">Welcome back!</p>

          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-3 text-white bg-transparent border-2 border-white/50 rounded-full focus:border-white focus:outline-none transition-colors"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-3 text-white bg-transparent border-2 border-white/50 rounded-full focus:border-white focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-300 bg-red-900/50 p-3 rounded-md text-sm text-center mb-4">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-bold text-blue-600 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? "Logging in..." : "LOGIN"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-100">
              Dont have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-white hover:underline"
              >
                Sign up
              </Link>
            </p>
            <p className="mt-8 text-xs text-blue-200/70">
              © {new Date().getFullYear()} kZStore. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
