"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface SliderImage {
  src: string;
  alt: string;
}

interface ShuttersSliderProps {
  images: SliderImage[];
}

const SHUTTER_COUNT = 10;

export default function ShuttersSlider({ images }: ShuttersSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const shutterVariants = {
    initial: (custom: number) => ({
      y: custom % 2 === 0 ? "-100%" : "100%",
    }),
    animate: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.45, 0.05, 0.55, 0.95],
      },
    },
    exit: (custom: number) => ({
      y: custom % 2 === 0 ? "100%" : "-100%",
      transition: {
        duration: 0.8,
        ease: [0.45, 0.05, 0.55, 0.95],
      },
    }),
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            {[...Array(SHUTTER_COUNT)].map((_, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={shutterVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: `inset(${(index / SHUTTER_COUNT) * 100}% 0 ${
                    ((SHUTTER_COUNT - index - 1) / SHUTTER_COUNT) * 100
                  }% 0)`,
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${images[currentIndex].src})`,
                    transform: `translateY(${
                      ((index - SHUTTER_COUNT / 2) / SHUTTER_COUNT) * 20
                    }px)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
}
