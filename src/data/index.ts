export type Game = {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  price: number;
  cover_image_url: string | null;
  developer: string | null;
  release_date: string | null;
  original_price: number | null;
  is_bestseller: boolean | null;
  is_popular: boolean | null;
  status: string | null;
};
