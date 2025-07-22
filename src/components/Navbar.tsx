"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { logout } from "@/app/auth/actions";

type Profile = {
  username: string | null;
  avatar_url: string | null; // Ini adalah path
  publicAvatarUrl: string | null; // Ini adalah URL yang sudah jadi
} | null;

type NavbarProps = {
  user: User | null;
  profile: Profile;
};

export default function Navbar({ user, profile }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Action", href: "/genres/action" },
    { name: "RPG", href: "/genres/rpg" },
    { name: "Survival", href: "/genres/survival" },
    { name: "Adventure", href: "/genres/adventure" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full text-white z-50 transition-all duration-300 ease-in-out 
      ${isScrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logos/kZ-logo.svg"
              alt="KZ Store Logo"
              width={124}
              height={124}
              className="w-16 sm:w-20 md:w-28 h-auto"
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/games"
            className="hover:text-indigo-400 transition-colors"
          >
            Games
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="flex items-center hover:text-indigo-400 transition-colors"
            >
              <span>Browse Games</span>
              <ChevronDown
                size={20}
                className={`ml-1 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/store"
            className="hover:text-indigo-400 transition-colors"
          >
            Store
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!isProfileOpen)}
                onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
                className="flex items-center rounded-full transition-opacity hover:opacity-80"
              >
                <Image
                  src={
                    profile?.publicAvatarUrl ||
                    `https://api.dicebear.com/8.x/initials/svg?seed=${user.email}`
                  }
                  alt={profile?.username || "User Avatar"}
                  width={36}
                  height={36}
                  className="rounded-full object-cover aspect-square border-2 border-transparent hover:border-indigo-500"
                />
              </button>
              {isProfileOpen && (
                <div
                  className="absolute top-full right-0 mt-3 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-20"
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div className="flex items-center gap-4 p-4 border-b border-gray-700">
                    <Image
                      src={
                        profile?.publicAvatarUrl ||
                        `https://api.dicebear.com/8.x/initials/svg?seed=${user.email}`
                      }
                      alt="User Avatar"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white truncate">
                        {profile?.username || "New User"}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        <Settings size={16} />
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <form action={logout}>
                        <button
                          type="submit"
                          className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </form>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // Jika user LOGOUT
            <>
              <Link
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="border-2 border-gray-300 hover:bg-white hover:text-black text-white font-semibold py-2 px-5 rounded-lg transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
