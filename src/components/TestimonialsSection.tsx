"use client";

import useEmblaCarousel from "embla-carousel-react";
import { testimonialsData, type Testimonial } from "@/data/testimonials";
import Image from "next/image";
import { Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Komponen untuk menampilkan bintang rating
function Rating({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          fill={i < count ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

// Komponen untuk satu kartu testimoni
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={testimonial.avatarUrl}
          alt={`Avatar of ${testimonial.name}`}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div>
          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
      <Rating count={testimonial.rating} />
      <p className="mt-4 text-gray-600 leading-relaxed">
        {testimonial.comment}
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect);
      return () => emblaApi.off("select", onSelect);
    }
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          12,000+ gamers satisfied
        </h2>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
          Lets hear what our customers have to say about their satisfaction with
          our services and products.
        </p>
      </div>

      <div className="mt-12 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 -ml-6 pl-6">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Indikator Titik */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-6 bg-indigo-500" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
