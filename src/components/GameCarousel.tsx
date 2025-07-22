"use client";

import GameCard, { type Game } from "./GameCard";
import Link from "next/link";

type GameCarouselProps = {
  games: Game[];
  title: string;
  browseLink: string;
};

export default function GameCarousel({
  games,
  title,
  browseLink,
}: GameCarouselProps) {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        <Link
          href={browseLink}
          className="text-indigo-600 hover:text-indigo-500 transition-colors"
        >
          Browse all games
        </Link>
      </div>

      <div className="flex space-x-8 overflow-x-auto pb-4 -mb-4 snap-x snap-mandatory">
        {games.map((game) => (
          <div
            key={game.id}
            className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(25%-1.5rem)] flex-shrink-0 snap-start"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}
