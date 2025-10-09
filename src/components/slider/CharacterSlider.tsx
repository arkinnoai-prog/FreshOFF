import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Bag {
  id: number;
  name: string;
  title: string;
  image: string;
  bgColor: string;
  primaryColor: string;
  price?: string;
  rating?: number;
  features?: string[];
  description?: string;
}

interface CharacterSliderProps {
  bags: Bag[];
  onBagSelect: (bagId: number) => void;
}

const CharacterSlider: React.FC<CharacterSliderProps> = ({
  bags,
  onBagSelect,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? bags.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === bags.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleTimelineClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getVisibleBags = () => {
    const visible = [];
    const visibleCount = windowWidth < 640 ? 2 : windowWidth < 1024 ? 3 : 4;
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % bags.length;
      visible.push({ ...bags[index], offset: i });
    }
    return visible;
  };

  const handleCardClick = (bag: Bag) => {
    onBagSelect(bag.id);
  };

  const getIconSize = () => {
    if (windowWidth < 640) return 18;
    if (windowWidth < 1024) return 22;
    return 28;
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden font-sans">
      {/* Mobile/Tablet Stacked Layout & Desktop Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen">
        {/* Left Preview Section */}
        <div className="relative w-full lg:w-[40%] h-[45vh] sm:h-[50vh] lg:h-full">
          {/* Background with gradient */}
          <div className={`absolute inset-0 transition-all duration-700`}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Large bag image with shadows */}
          <div className="relative h-full flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 shadow-[inset_0_40px_60px_-20px_rgba(0,0,0,0.8),inset_0_-40px_60px_-20px_rgba(0,0,0,0.8)]"></div>
              <img
                key={activeIndex}
                src={bags[activeIndex].image}
                alt={bags[activeIndex].name}
                className="w-full h-full object-cover animate-[fadeIn_0.7s_ease-in-out]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
          </div>

          {/* Desktop Vertical Timeline */}
          <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-0 cursor-pointer z-30">
            <div className="relative flex flex-col items-center">
              <div className="w-[2px] h-12 bg-white/30"></div>
              {bags.map((_, index) => (
                <React.Fragment key={index}>
                  <div
                    className="relative group"
                    onClick={() => handleTimelineClick(index)}
                  >
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-500 cursor-pointer ${
                        index === activeIndex
                          ? "w-6 h-6 bg-white shadow-lg shadow-white/50"
                          : "w-5 h-5 bg-white/40 hover:bg-white/60 hover:scale-110"
                      }`}
                    >
                      <span
                        className={`font-bold transition-all duration-300 ${
                          index === activeIndex
                            ? "text-purple-900 text-sm"
                            : "text-white text-xs"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  {index < bags.length - 1 && (
                    <div className="w-[2px] h-16 bg-white/30"></div>
                  )}
                </React.Fragment>
              ))}
              <div className="w-[2px] h-20 bg-white/30"></div>
            </div>
          </div>

          {/* Mobile Horizontal Timeline */}
          <div className="flex lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 items-center gap-0 cursor-pointer z-30">
            <div className="relative flex items-center">
              <div className="h-[2px] w-4 bg-white/30"></div>
              {bags.map((_, index) => (
                <React.Fragment key={index}>
                  <div
                    className="relative group"
                    onClick={() => handleTimelineClick(index)}
                  >
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-500 cursor-pointer ${
                        index === activeIndex
                          ? "w-6 h-6 bg-white shadow-lg shadow-white/50"
                          : "w-4 h-4 bg-white/40 hover:bg-white/60 hover:scale-110"
                      }`}
                    >
                      <span
                        className={`font-bold transition-all duration-300 ${
                          index === activeIndex
                            ? "text-purple-900 text-[10px]"
                            : "text-white text-[8px]"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  {index < bags.length - 1 && (
                    <div className="h-[2px] w-8 sm:w-12 bg-white/30"></div>
                  )}
                </React.Fragment>
              ))}
              <div className="h-[2px] w-4 bg-white/30"></div>
            </div>
          </div>

          <div className="absolute top-6 sm:top-8 lg:top-34 left-4 sm:left-8 lg:left-28 right-4 sm:right-8 lg:right-20 z-20">
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/90 font-medium">
              {bags[activeIndex].title}
            </p>
          </div>

          <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 xl:bottom-36 left-4 sm:left-8 lg:left-19 right-4 sm:right-8 lg:right-22 z-20">
            <div className="text-white">
              <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4">
                <h2
                  className="hidden lg:block text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold animate-[fadeIn_0.5s_ease-in-out] whitespace-nowrap"
                  key={`name-${activeIndex}`}
                >
                  {bags[activeIndex].name}
                </h2>
                <div className="hidden lg:block w-1/2 h-[2px] bg-white/70"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Bag Grid with Dynamic Background */}
        <div
          className="relative w-full lg:w-[60%] min-h-[55vh] sm:min-h-[50vh] lg:min-h-screen lg:h-full transition-all duration-700 flex flex-col"
          style={{
            background: `linear-gradient(135deg, ${bags[activeIndex].primaryColor} 0%, ${bags[activeIndex].primaryColor}dd 25%, ${bags[activeIndex].primaryColor}99 50%, ${bags[activeIndex].primaryColor}66 75%, ${bags[activeIndex].primaryColor}33 100%)`,
          }}
        >
          {/* Shiny gradient overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                animation: "shimmer 3s infinite",
              }}
            ></div>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at top right, rgba(255,255,255,0.3) 0%, transparent 50%), 
                           radial-gradient(ellipse at bottom left, rgba(255,255,255,0.2) 0%, transparent 50%)`,
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `conic-gradient(from 180deg at 80% 20%, transparent 0deg, rgba(255,255,255,0.2) 60deg, transparent 120deg)`,
              }}
            ></div>
          </div>

          <div className="relative h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 lg:xl:px-20 py-6 sm:py-8 lg:py-12 z-10">
            {/* Title at top - Responsive */}
            <div className="mb-6 sm:mb-8 lg:mb-12 xl:mb-16 flex-shrink-0">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide drop-shadow-2xl">
                {bags[activeIndex].name}
              </h2>
            </div>

            {/* Cards Grid - Responsive with proper spacing */}
            <div className="flex-1 flex items-center min-h-0">
              <div className="w-full overflow-x-auto scrollbar-hide pb-4 lg:pb-0">
                <div className="flex gap-3 justify-center sm:gap-4 lg:gap-5 xl:gap-6 min-w-min items-center">
                  {getVisibleBags().map((bag, idx) => (
                    <div
                      key={`${bag.id}-${idx}`}
                      className={`relative group transition-all duration-500 ease-out cursor-pointer flex-shrink-0 ${
                        idx === 0
                          ? "animate-[scaleIn_0.6s_ease-out]"
                          : "animate-[slideIn_0.6s_ease-out]"
                      }`}
                      style={{
                        animationDelay: `${idx * 0.1}s`,
                        transform: `translateX(${isAnimating ? "20px" : "0"})`,
                        opacity: isAnimating ? 0 : 1,
                      }}
                      onClick={() => handleCardClick(bag)}
                    >
                      <div
                        className={`relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-white/30 ${
                          idx === 0
                            ? "w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-68 lg:w-60 lg:h-80 xl:w-72 xl:h-96"
                            : "w-28 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 lg:w-48 lg:h-64 xl:w-56 xl:h-80"
                        }`}
                        style={{
                          boxShadow:
                            "0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)",
                        }}
                      >
                        {/* Image */}
                        <img
                          src={bag.image}
                          alt={bag.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Shine overlay effects on cards */}
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)`,
                              animation: "cardShine 0.6s ease-in-out",
                            }}
                          ></div>
                          <div
                            className="absolute top-0 left-0 right-0 h-12 sm:h-16 lg:h-20 xl:h-24"
                            style={{
                              background: `linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)`,
                            }}
                          ></div>
                          <div
                            className="absolute inset-0 opacity-30"
                            style={{
                              background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                            }}
                          ></div>
                          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 lg:h-24 xl:h-28 bg-gradient-to-t from-black/90 to-transparent"></div>
                        </div>

                        <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 lg:h-16 bg-gradient-to-b from-black/40 to-transparent z-10"></div>

                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                          style={{
                            background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                            transform: "translateX(-100%)",
                            animation: "cardShimmer 0.6s ease-in-out",
                          }}
                        ></div>

                        <div
                          className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "transparent",
                            boxShadow: "inset 0 0 20px rgba(255,255,255,0.2)",
                          }}
                        ></div>

                        {/* Bag Info - Responsive text */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 text-white z-20">
                          <h3
                            className={`font-bold mb-0.5 sm:mb-1 drop-shadow-lg ${
                              idx === 0
                                ? "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                                : "text-[10px] sm:text-xs md:text-sm lg:text-base"
                            }`}
                          >
                            {bag.name}
                          </h3>
                          <p
                            className={`text-gray-300 drop-shadow-lg line-clamp-1 ${
                              idx === 0
                                ? "text-[10px] sm:text-xs md:text-sm lg:text-base"
                                : "text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
                            }`}
                          >
                            {bag.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation buttons - Better positioning */}
            <div className="flex items-center justify-center sm:justify-start  lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-8 lg:mt-12 flex-shrink-0">
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-110"
                style={{
                  boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
                }}
              >
                <ArrowLeft size={getIconSize()} />
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-110"
                style={{
                  boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
                }}
              >
                <ArrowRight size={getIconSize()} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes cardShine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes cardShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CharacterSlider;
