import Image from "next/image";
import Link from "next/link";

type Genre = {
  id: string;
  name: string;
  background_image_url: string;
};

export default function GenreCard({ genre }: { genre: Genre }) {
  const placeholderImage =
    "https://placehold.co/400x600/1a202c/9ca3af?text=Genre";

  return (
    <Link
      href={`/genres/${genre.name.toLowerCase()}`}
      className="group relative block w-full h-64 rounded-lg overflow-hidden shadow-lg"
    >
      <Image
        src={genre.background_image_url || placeholderImage}
        alt={`Image for ${genre.name} genre`}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute inset-0 flex items-end justify-center p-4">
        <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg">
          {genre.name}
        </h3>
      </div>
    </Link>
  );
}
