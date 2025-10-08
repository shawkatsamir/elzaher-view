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
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlide = carouselData[currentIndex];
  const imagePath = currentSlide?.src || currentSlide?.image || "";

  return (
    <div className="relative group rounded-xl overflow-hidden">
      <div className={`relative ${height} overflow-hidden`}>
        <Img
          src={imagePath}
          alt={currentSlide?.title || ""}
          className="w-full h-full object-cover transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {overlayContent &&
          (currentSlide.title ||
            currentSlide.subtitle ||
            currentSlide.description) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-4xl">
                {currentSlide.title && (
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {currentSlide.title}
                  </h1>
                )}

                {(currentSlide.subtitle || currentSlide.description) && (
                  <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
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
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="الصورة التالية"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft />
            </button>
          </>
        )}

        {autoPlay && carouselData.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
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
