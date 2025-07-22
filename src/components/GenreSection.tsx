import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import GenreCard from "./GenreCard";

export default async function GenreSection() {
  const supabase = createClient();
  const { data: genres } = await supabase.from("genres").select("*").limit(6);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Games Genres</h2>
        <Link
          href="/genres"
          className="text-indigo-600 hover:text-indigo-300 transition-colors"
        >
          See all genres
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {genres?.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  );
}
