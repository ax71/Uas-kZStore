"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      setMessage(`Error: ${error.message}`);
      return;
    }

    if (data.user) {
      setMessage(
        "Registration successful! Please check your email to confirm your account."
      );
      setEmail("");
      setPassword("");
      setUsername("");
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
                JOIN THE <span className="font-bold">COMMUNITY</span>
              </p>
            </div>
            <p className="text-sm">Create an account to get started.</p>
          </div>
        </div>

        <div className="w-full p-8 md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-700">
          <h2 className="text-2xl font-bold text-white text-center">
            Create an Account
          </h2>

          <form onSubmit={handleRegister} className="mt-8">
            <div className="mb-5">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full px-4 py-3 text-white bg-transparent border-2 border-white/50 rounded-full focus:border-white focus:outline-none transition-colors"
              />
            </div>
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
                minLength={6}
                className="w-full px-4 py-3 text-white bg-transparent border-2 border-white/50 rounded-full focus:border-white focus:outline-none transition-colors"
              />
            </div>

            {message && (
              <p
                className={`p-3 rounded-md text-sm text-center mb-4 ${
                  message.startsWith("Error:")
                    ? "bg-red-900/50 text-red-300"
                    : "bg-green-900/50 text-green-300"
                }`}
              >
                {message}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 font-bold text-blue-600 bg-white rounded-full hover:bg-gray-200 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? "Creating Account..." : "SIGN UP"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-100">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-white hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
