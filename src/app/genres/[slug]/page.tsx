import { createClient } from "@/lib/supabase/server";
import GameCard from "@/components/GameCard";
import { type Game } from "@/types";
import { notFound } from "next/navigation";

// Tipe untuk parameter yang datang dari URL
type Props = {
  params: {
    slug: string;
  };
};

// Fungsi untuk membuat metadata halaman dinamis (misal: judul tab browser)
export async function generateMetadata({ params }: Props) {
  // Mengubah slug 'role-playing' menjadi 'Role Playing'
  const genreName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${genreName} Games | KZStore`,
  };
}

export default async function GenrePage({ params }: Props) {
  const supabase = createClient();
  const { slug } = params;

  // 1. Dapatkan ID genre berdasarkan slug (nama genre)
  const { data: genre, error: genreError } = await supabase
    .from("genres")
    .select("id, name")
    .eq("name", slug.replace(/-/g, " ")) // Ganti '-' dengan spasi jika ada
    .single();

  // Jika genre tidak ditemukan, tampilkan halaman 404 Not Found
  if (!genre || genreError) {
    notFound();
  }

  // 2. Dapatkan semua game_id yang berhubungan dengan genre_id ini
  const { data: gameGenres, error: gameGenresError } = await supabase
    .from("game_genres")
    .select("game_id")
    .eq("genre_id", genre.id);

  if (gameGenresError) {
    console.error("Error fetching game genres:", gameGenresError);
    return <p className="text-center text-red-500">Error loading games.</p>;
  }

  // Jika tidak ada game di genre ini, tampilkan pesan
  if (!gameGenres || gameGenres.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {genre.name} Games
        </h1>
        <p className="text-gray-600">No games found in this genre yet.</p>
      </div>
    );
  }

  // Ekstrak semua ID game menjadi sebuah array
  const gameIds = gameGenres.map((gg) => gg.game_id);

  // 3. Dapatkan detail lengkap dari semua game yang ID-nya ada di array gameIds
  const { data: games, error: gamesError } = await supabase
    .from("games")
    .select<"*", Game>("*")
    .in("id", gameIds);

  if (gamesError) {
    console.error("Error fetching games details:", gamesError);
    return (
      <p className="text-center text-red-500">Error loading game details.</p>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            {genre.name} Games
          </h1>
          <p className="text-lg text-gray-500">
            Browse our collection of games in the {genre.name} genre.
          </p>
        </div>

        {games && games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {games
              .filter((game) => game.cover_image_url)
              .map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No games found in this genre.
          </p>
        )}
      </div>
    </div>
  );
}
