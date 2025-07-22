export type Testimonial = {
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  comment: string;
};

export const testimonialsData: Testimonial[] = [
  {
    name: "Jacob Jones",
    role: "Verified Gamer",
    avatarUrl: "https://i.pravatar.cc/150?u=jacob",
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Cameron Williamson",
    role: "Top Reviewer",
    avatarUrl: "https://i.pravatar.cc/150?u=cameron",
    rating: 5,
    comment:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    name: "Kristin Watson",
    role: "Pro Player",
    avatarUrl: "https://i.pravatar.cc/150?u=kristin",
    rating: 5,
    comment:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed ut perspiciatis unde omnis iste natus.",
  },
  {
    name: "Arthur Morgan",
    role: "Outlaw Gamer",
    avatarUrl: "https://i.pravatar.cc/150?u=arthur",
    rating: 4,
    comment:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  },
];
