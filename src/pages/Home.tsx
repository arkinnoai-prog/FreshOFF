import { useState } from "react";
import { bags, type Bag } from "../data/homeData";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import CharacterSlider from "../components/slider/CharacterSlider";
import ProductModal from "../components/home/ProductModal";
import FeaturesSection from "../components/home/FeatureSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProducts from "../components/home/FeaturedProduct";
import NewsletterSection from "../components/home/NewsSelector";
import InteractiveBentoGallery from "@/components/blocks/interactive-bento-gallery";
import { auctionMediaItems } from "@/data/auctionData";
import { VirtualTryOnHero } from "@/components/blocks/spotlight-new";

const HomePage = () => {
  const [selectedBag, setSelectedBag] = useState<Bag | null>(null);

  const handleBagSelection = (bagId: number) => {
    const bag = bags.find((b) => b.id === bagId);
    if (bag) {
      setSelectedBag(bag);
    }
  };

  const handleCloseModal = () => {
    setSelectedBag(null);
  };

  return (
    <div className="overflow-hidden bg-black relative">
      {/* Global Glass Shine Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Main diagonal shine effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(115deg, 
              transparent 0%,
              transparent 40%,
              rgba(255,255,255,0.03) 45%,
              rgba(255,255,255,0.08) 50%,
              rgba(255,255,255,0.03) 55%,
              transparent 60%,
              transparent 100%)`,
            backgroundSize: "200% 200%",
            animation: "diagonalGlassShine 15s ease-in-out infinite",
          }}
        />

        {/* Secondary shimmer effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              transparent 0%,
              transparent 35%,
              rgba(255,255,255,0.02) 40%,
              rgba(255,255,255,0.05) 45%,
              rgba(255,255,255,0.02) 50%,
              transparent 55%,
              transparent 100%)`,
            backgroundSize: "250% 250%",
            animation: "diagonalGlassShine 20s ease-in-out infinite reverse",
          }}
        />

        {/* Subtle glass reflection */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 45deg at 30% 30%, 
              transparent 0deg, 
              rgba(255,255,255,0.02) 45deg, 
              transparent 90deg,
              transparent 180deg,
              rgba(255,255,255,0.01) 270deg,
              transparent 360deg)`,
            animation: "rotateShine 30s linear infinite",
          }}
        />
      </div>

      {/* Hero Section with Glass Effect */}
      <div
        className="relative transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, 
            #0a0a0a 0%, 
            #141414 15%, 
            #1a1a1a 30%, 
            #0f0f0f 50%, 
            #080808 70%, 
            #000000 100%)`,
        }}
      >
        {/* Glass-like overlay with blur */}
        <div className="absolute inset-0">
          {/* Frosted glass effect */}
          <div
            className="absolute inset-0 backdrop-blur-[0.5px]"
            style={{
              background: `linear-gradient(45deg, 
                rgba(255,255,255,0.02) 0%, 
                rgba(255,255,255,0.04) 25%, 
                rgba(255,255,255,0.01) 50%, 
                rgba(255,255,255,0.03) 75%, 
                rgba(255,255,255,0.01) 100%)`,
            }}
          />

          {/* Animated light streak */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(105deg, 
                transparent 0%,
                transparent 40%, 
                rgba(255,255,255,0.05) 45%, 
                rgba(255,255,255,0.1) 50%, 
                rgba(255,255,255,0.05) 55%, 
                transparent 60%,
                transparent 100%)`,
              animation: "lightStreak 8s ease-in-out infinite",
            }}
          />

          {/* Radial light spots for glass effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.06) 0%, transparent 40%), 
                           radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.04) 0%, transparent 40%),
                           radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)`,
            }}
          />

          {/* Top glass highlight */}
          <div
            className="absolute top-0 left-0 right-0 h-96"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(255,255,255,0.08) 0%, 
                rgba(255,255,255,0.04) 30%, 
                transparent 100%)`,
              backdropFilter: "blur(1px)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>

      {/* Stats Section with glass gradient */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(to bottom, 
            #000000 0%, 
            #0a0a0a 30%, 
            #0f0f0f 60%, 
            #050505 100%)`,
        }}
      >
        <div
          className="absolute inset-0 backdrop-blur-[0.5px]"
          style={{
            background: `linear-gradient(180deg, 
              rgba(255,255,255,0.02) 0%, 
              transparent 50%, 
              rgba(255,255,255,0.01) 100%)`,
          }}
        />
        <div className="relative z-10">
          <StatsSection />
        </div>
      </div>

      {/* Character Slider Section */}
      <section
        className="relative"
        style={{
          background: `linear-gradient(135deg, 
            #0d0d0d 0%, 
            #111111 50%, 
            #0a0a0a 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(255,255,255,0.01)`,
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div className="relative z-10">
          <CharacterSlider bags={bags} onBagSelect={handleBagSelection} />
        </div>
      </section>

      <div
        className="relative"
        style={{
          background: `linear-gradient(135deg, 
            #000000 0%, 
            #0a0a0a 33%, 
            #0f0f0f 66%, 
            #050505 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(255,255,255,0.03) 0%, 
              transparent 70%)`,
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div className="relative z-10">
          <VirtualTryOnHero />
        </div>
      </div>

      {/* Product Popup Modal */}
      <ProductModal bag={selectedBag} onClose={handleCloseModal} />

      {/* Features Section */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(135deg, 
            #0f0f0f 0%, 
            #0a0a0a 25%, 
            #080808 50%, 
            #0d0d0d 75%, 
            #000000 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255,255,255,0.02) 50%, 
              transparent 100%)`,
            backdropFilter: "blur(0.3px)",
          }}
        />
        <div className="relative z-10">
          <FeaturesSection />
        </div>
      </div>

      {/* Categories Section */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(135deg, 
            #000000 0%, 
            #0a0a0a 33%, 
            #0f0f0f 66%, 
            #050505 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(255,255,255,0.03) 0%, 
              transparent 70%)`,
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div className="relative z-10">
          <CategoriesSection />
        </div>
      </div>

      {/* Featured Products */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(135deg, 
            #0d0d0d 0%, 
            #080808 50%, 
            #000000 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, 
              rgba(255,255,255,0.01) 0%, 
              rgba(255,255,255,0.02) 50%, 
              rgba(255,255,255,0.01) 100%)`,
            backdropFilter: "blur(0.3px)",
          }}
        />
        <div className="relative z-10">
          <FeaturedProducts />
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        className="relative"
        style={{
          background: `linear-gradient(to bottom, 
            #000000 0%, 
            #0a0a0a 50%, 
            #050505 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, 
              rgba(255,255,255,0.02) 0%, 
              transparent 100%)`,
            backdropFilter: "blur(0.5px)",
          }}
        />
        <div className="relative z-10">
          <NewsletterSection />
        </div>
      </div>

      <div
        className="relative"
        style={{
          background: `linear-gradient(135deg, 
            #0d0d0d 0%, 
            #080808 50%, 
            #000000 100%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, 
              rgba(255,255,255,0.01) 0%, 
              rgba(255,255,255,0.02) 50%, 
              rgba(255,255,255,0.01) 100%)`,
            backdropFilter: "blur(0.3px)",
          }}
        />
        <div className="relative z-10">
          <InteractiveBentoGallery
            title="Featured Auctions"
            description="Explore our exclusive collection of auction items."
            mediaItems={auctionMediaItems}
          />
        </div>
      </div>

      <style>{`
        @keyframes diagonalGlassShine {
          0% {
            background-position: -100% -100%;
            opacity: 0;
          }
          15% {
            opacity: 0.4;
          }
          50% {
            background-position: 50% 50%;
            opacity: 0.6;
          }
          85% {
            opacity: 0.4;
          }
          100% {
            background-position: 200% 200%;
            opacity: 0;
          }
        }

        @keyframes lightStreak {
          0% {
            transform: translateX(-150%) translateY(-150%) rotate(45deg);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          50% {
            transform: translateX(0%) translateY(0%) rotate(45deg);
            opacity: 0.5;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(150%) translateY(150%) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes rotateShine {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

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

        @keyframes modalSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* Glass morphism effect for cards if needed */
        .glass-effect {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
