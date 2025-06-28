"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    { name: "Action", href: "/category/action" },
    { name: "RPG", href: "/category/rpg" },
    { name: "Strategy", href: "/category/strategy" },
    { name: "Adventure", href: "/category/adventure" },
  ];

  return (
    <nav className="bg-black text-white shadow-md">
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
              <div
                className="absolute top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-10"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <ul>
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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
        </div>
      </div>
    </nav>
  );
}
