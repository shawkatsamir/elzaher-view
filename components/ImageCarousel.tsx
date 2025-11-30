"use client";

import { useEffect, useState } from "react";
import { Img } from "./Image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface CarouselImage {
  src?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface ImageCarouselProps {
  images?: CarouselImage[];
  slides?: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  interval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  height?: string;
  width?: string;
  overlayContent?: boolean;
}
export function ImageCarousel({
  images,
  slides,
  autoPlay = true,
  autoPlayInterval,
  interval = 5000,
  showIndicators = true,
  showNavigation = true,
  height = "h-96",
  overlayContent = false,
}: ImageCarouselProps) {
  const carouselData = slides || images || [];
  const playInterval = autoPlayInterval || interval;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || carouselData.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, playInterval);

    return () => clearInterval(timer);
  }, [isPlaying, playInterval, carouselData.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1,
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlide = carouselData[currentIndex];
  const imagePath = currentSlide?.src || currentSlide?.image || "";

  return (
    <div className="group relative overflow-hidden rounded-xl">
      <div className={`relative ${height} overflow-hidden`}>
        <div className="absolute inset-0">
          <Img
            src={imagePath}
            alt={currentSlide?.title || ""}
            className="transition-transform duration-500"
            priority={currentIndex === 0}
            fetchPriority="high"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {overlayContent &&
          (currentSlide.title ||
            currentSlide.subtitle ||
            currentSlide.description) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4xl px-6 text-center text-white">
                {currentSlide.title && (
                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                    {currentSlide.title}
                  </h1>
                )}

                {(currentSlide.subtitle || currentSlide.description) && (
                  <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl">
                    {currentSlide.subtitle || currentSlide.description}
                  </p>
                )}
              </div>
            </div>
          )}

        {showNavigation && carouselData.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 group-hover:opacity-100"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="الصورة التالية"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 group-hover:opacity-100"
            >
              <ChevronLeft />
            </button>
          </>
        )}

        {autoPlay && carouselData.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute left-4 top-4 rounded-full bg-white/20 p-2 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 group-hover:opacity-100"
            aria-label={isPlaying ? "إيقاف التشغيل التلقائي" : "تشغيل التلقائي"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
        )}

        {showIndicators && carouselData.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2 space-x-reverse">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "scale-125 bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`الذهاب إلى الصورة ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
