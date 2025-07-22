import Image from "next/image";
import Link from "next/link";
import { type Game } from "@/types";

export default function GameCard({ game }: { game: Game }) {
  const placeholderImage =
    "https://placehold.co/600x400/1a202c/9ca3af?text=No+Image";
  const hasDiscount = game.original_price && game.original_price > game.price;
  const isFree = game.price === 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link
      href={`/games/${game.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative w-full h-48">
        <Image
          src={game.cover_image_url || placeholderImage}
          alt={`Cover for ${game.name}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
          className="object-cover"
        />
      </div>
      <div className="p-4 text-gray-800">
        <h3 className="text-lg font-semibold truncate group-hover:text-indigo-600 transition-colors">
          {game.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          {isFree ? (
            <span className="text-lg font-bold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
              Free Download
            </span>
          ) : (
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-indigo-600">
                {formatCurrency(game.price)}
              </p>
              {hasDiscount && (
                <p className="text-sm text-gray-500 line-through">
                  {formatCurrency(game.original_price!)}
                </p>
              )}
            </div>
          )}
          {hasDiscount && (
            <div className="text-sm font-bold bg-red-100 text-red-600 px-2 py-1 rounded-md">
              -{" "}
              {Math.round(
                ((game.original_price! - game.price) / game.original_price!) *
                  100
              )}
              %
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
