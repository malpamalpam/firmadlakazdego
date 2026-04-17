"use client";

import { useState, useEffect } from "react";

interface HeroCarouselProps {
  slides: string[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative min-h-[100px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`uppercase transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0 absolute top-0 left-0"
          }`}
          dangerouslySetInnerHTML={{ __html: slide }}
        />
      ))}
    </div>
  );
}
