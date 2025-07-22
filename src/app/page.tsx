import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import GenreSection from "@/components/GenreSection";
import GameCarousel from "@/components/GameCarousel";
import GameCard from "@/components/GameCard";
import ComingSoonSection from "@/components/ComingSoonSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { createClient } from "@/lib/supabase/server";
import { type Game } from "@/types";

export default async function Home() {
  const supabase = createClient();

  const { data: bestSellerGames } = await supabase
    .from("games")
    .select<"*", Game>("*")
    .eq("is_bestseller", true)
    .limit(8);

  const { data: popularGames } = await supabase
    .from("games")
    .select<"*", Game>("*")
    .eq("is_popular", true)
    .limit(8);

  return (
    <div className="bg-gray-50 text-gray-800">
      <HeroSection />
      <WhyUsSection />

      <div className="bg-white">
        <GenreSection />
      </div>

      {bestSellerGames && bestSellerGames.length > 0 && (
        <GameCarousel
          games={bestSellerGames}
          title="Best Seller Games"
          browseLink="/games/bestsellers"
        />
      )}

      {popularGames && popularGames.length > 0 && (
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Popular Games</h2>
            <a
              href="/games/popular"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Browse all games
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}
      <ComingSoonSection />
      <TestimonialsSection />
    </div>
  );
}
