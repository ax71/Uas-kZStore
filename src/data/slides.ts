export type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  href: string;
  buttonText: string;
};

export const heroSlides: Slide[] = [
  {
    id: 1,
    image: "/images/hero/home-hero.png",
    title: "MultiVersus",
    subtitle: "Now officially free to play for all Xbox users.",
    href: "/games/multiversus",
    buttonText: "Get in now!",
  },
  {
    id: 2,
    image: "/images/hero/fortnite-hero.png",
    title: "Fortnite",
    subtitle: "Chapter 5 Season 3: Wrecked is here.",
    href: "/games/fortnite",
    buttonText: "Drop In",
  },
  {
    id: 3,
    image: "/images/hero/gensin-hero.png",
    title: "Genshin Impact",
    subtitle: "Explore the vast magical world of Teyvat.",
    href: "/games/genshin-impact",
    buttonText: "Explore Now",
  },
];
