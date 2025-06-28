import React from "react";
import Image from "next/image";
import { whyUsFeatures } from "@/data/features";

export default function WhyUsSection() {
  return (
    <section className="bg-white text-gray-950 py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950">
            Why kZStore?
          </h2>
          <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">
            We are the official Xbox partner in Indonesia that provides official
            video games.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {whyUsFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-18 h-18 mb-6 rounded-full flex items-center justify-center backdrop-blur-sm border border-indigo-300/30">
                <div className="rounded-full flex items-center justify-center">
                  <Image
                    src={feature.iconSrc}
                    alt={feature.altText}
                    width={64}
                    height={64}
                  />
                </div>
              </div>

              <p className="text-lg text-gray-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
