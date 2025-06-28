"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "../data/slides";

export default function HeroSection() {
  const slides = heroSlides;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(timer);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden text-white">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div className="relative flex-[0_0_100%] h-full" key={slide.id}>
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={slide.id === 1}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-transparent"></div>

              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 w-full md:w-3/5 lg:w-1/2">
                <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-lg drop-shadow-md">
                  {slide.subtitle}
                </p>
                <Link href={slide.href} className="mt-8">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform hover:scale-105">
                    {slide.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 rounded-full transition-colors z-10"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 rounded-full transition-colors z-10"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-2 bg-indigo-600" : "w-2 bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
