import React, { useState } from "react";
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
    for (let i = 0; i < 4; i++) {
      const index = (activeIndex + i) % bags.length;
      visible.push({ ...bags[index], offset: i });
    }
    return visible;
  };

  const handleCardClick = (bag: Bag) => {
    onBagSelect(bag.id);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-roboto">
      {/* Left Preview Section */}
      <div className="absolute left-0 top-0 w-[40%] h-full">
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

        {/* Vertical Timeline - Centered vertically with left margin */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0 cursor-pointer">
          <div className="relative flex flex-col items-center">
            <div className="w-[2px] h-12=0 bg-white/30"></div>
            {bags.map((bag, index) => (
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
        <div className="absolute top-43 left-28 right-20 font-bold">
          <p className="text-3xl text-white/80">{bags[activeIndex].title}</p>
        </div>
        {/* Text Overlay - Show bag name instead of collection */}
        <div className="absolute bottom-36 left-26 right-20">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-4">
              <h2
                className="text-5xl font-bold animate-[fadeIn_0.5s_ease-in-out]"
                key={`name-${activeIndex}`}
              >
                {bags[activeIndex].name}
              </h2>
              <div className="flex-1 h-[2px] bg-white/70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Bag Grid with Dynamic Background */}
      <div
        className="absolute right-0 top-0 w-[60%] h-full transition-all duration-700"
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
          {/* Additional shine effect */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `conic-gradient(from 180deg at 80% 20%, transparent 0deg, rgba(255,255,255,0.2) 60deg, transparent 120deg)`,
            }}
          ></div>
        </div>

        <div className="relative h-full flex flex-col items-start justify-center px-16 pl-24 z-10">
          {/* Title at top right */}
          <div className="absolute top-12 ">
            <h2 className="text-white text-5xl font-bold tracking-wide drop-shadow-2xl">
              {bags[activeIndex].name}
            </h2>
          </div>

          <div className="flex gap-6 mb-12 items-center">
            {getVisibleBags().map((bag, idx) => (
              <div
                key={`${bag.id}-${idx}`}
                className={`relative group transition-all duration-500 ease-out cursor-pointer ${
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
                  className={`relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-white/30 ${
                    idx === 0 ? "w-64 h-96" : "w-52 h-84"
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
                    {/* Main gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Diagonal shine effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)`,
                        animation: "cardShine 0.6s ease-in-out",
                      }}
                    ></div>

                    {/* Top shine */}
                    <div
                      className="absolute top-0 left-0 right-0 h-32"
                      style={{
                        background: `linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)`,
                      }}
                    ></div>

                    {/* Glass reflection effect */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                      }}
                    ></div>

                    {/* Bottom gradient for text */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/90 to-transparent"></div>
                  </div>

                  {/* Shadow overlays */}
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent z-10"></div>

                  {/* Animated shimmer on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                      transform: "translateX(-100%)",
                      animation: "cardShimmer 0.6s ease-in-out",
                    }}
                  ></div>

                  {/* Border glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "transparent",
                      boxShadow: "inset 0 0 20px rgba(255,255,255,0.2)",
                    }}
                  ></div>

                  {/* Bag Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                    <h3
                      className={`font-bold mb-1 drop-shadow-lg ${
                        idx === 0 ? "text-xl" : "text-lg"
                      }`}
                    >
                      {bag.name}
                    </h3>
                    <p
                      className={`text-gray-300 drop-shadow-lg ${
                        idx === 0 ? "text-base" : "text-sm"
                      }`}
                    >
                      {bag.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-110"
              style={{
                boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
              }}
            >
              <ArrowLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-110"
              style={{
                boxShadow: "0 4px 15px rgba(255,255,255,0.2)",
              }}
            >
              <ArrowRight size={28} />
            </button>
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
      `}</style>
    </div>
  );
};

export default CharacterSlider;
