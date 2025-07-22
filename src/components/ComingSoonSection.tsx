import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { type Game } from "./GameCard";

function PreOrderButton() {
  <p>hello world</p>;
  return (
    <button className="mt-4 px-5 py-2 border border-white/50 text-white rounded-lg text-sm font-semibold backdrop-blur-sm bg-black/30 hover:bg-white hover:text-black transition-all duration-300">
      Pre-order now!
    </button>
  );
}

export default async function ComingSoonSection() {
  const supabase = createClient();

  const { data: comingSoonGames } = await supabase
    .from("games")
    .select("*")
    .eq("status", "coming_soon")
    .order("release_date", { ascending: true })
    .limit(5);

  if (!comingSoonGames || comingSoonGames.length === 0) {
    return null;
  }

  const mainGame = comingSoonGames[0];
  const sideGames = comingSoonGames.slice(1);

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Coming Soon</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri - Game Utama */}
          <Link
            href={`/games/${mainGame.id}`}
            className="group relative block w-full h-96 rounded-xl overflow-hidden"
          >
            <Image
              src={mainGame.cover_image_url || ""}
              alt={`Cover for ${mainGame.name}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-3xl font-bold">{mainGame.name}</h3>
              <PreOrderButton />
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sideGames.map((game: Game) => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="group relative block w-full h-44 rounded-xl overflow-hidden"
              >
                <Image
                  src={game.cover_image_url || ""}
                  alt={`Cover for ${game.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-xl font-bold">{game.name}</h4>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <PreOrderButton />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
