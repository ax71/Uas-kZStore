// src/components/ProfileForm.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateProfile } from "@/app/profile/actions";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";

type Profile = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  publicAvatarUrl: string | null;
} | null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-3 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all"
    >
      {pending ? "Updating..." : "Update Profile"}
    </button>
  );
}

export default function ProfileForm({
  user,
  profile,
}: {
  user: User;
  profile: Profile;
}) {
  const [state, formAction] = useActionState(updateProfile, null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  console.log(profile?.publicAvatarUrl);

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={
              avatarPreview ||
              profile?.publicAvatarUrl ||
              `https://api.dicebear.com/8.x/initials/svg?seed=${user.email}`
            }
            alt="Avatar"
            width={128}
            height={128}
            className="rounded-full mb-4 aspect-square object-cover"
          />
          <label
            htmlFor="avatar"
            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-md"
          >
            Upload New Avatar
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 2MB</p>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              disabled
              className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md focus:outline-none cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              defaultValue={profile?.full_name ?? ""}
              className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={profile?.username ?? ""}
              className="w-full px-4 py-2 text-white bg-gray-900 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <SubmitButton />
        {state?.message && (
          <p
            className={`mt-4 text-sm text-center ${
              state.success ? "text-green-400" : "text-red-400"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
