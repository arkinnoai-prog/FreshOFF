import React from "react";
import Louis from "../../assets/brands/Louis_Vuitton_logo_and_wordmark (1).png";
import LongChamp from "../../assets/brands/Longchamp_logo.svg.png";
import Flurla from "../../assets/brands/furla-logo-black-and-white.png";
import MiuMiu from "../../assets/brands/Miu_Miu-Logo.wine.png";
import MichaelKors from "../../assets/brands/Michael_Kors_(brand)_logo.svg.png";
import Hermes from "../../assets/brands/Hermes-Logo.png";
import Fendi from "../../assets/brands/fendi-logo-png-transparent.png";
import Bottega from "../../assets/brands/Bottega-Veneta-Logo.png";
import Burbery from "../../assets/brands/5842a0c1a6515b1e0ad75af2.png";
import Gucci from "../../assets/brands/pngimg.com - gucci_PNG16.png";

export const Component = () => {
  // Images for the infinite scroll - using Unsplash URLs
  const images = [
    Louis,
    LongChamp,
    Flurla,
    MiuMiu,
    MichaelKors,
    Hermes,
    Fendi,
    Bottega,
    Burbery,
    Gucci,
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 20s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
          background: black;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .image-item img {
          object-fit: contain;
          padding: 1rem;
        }
      `}</style>

      <div className="w-full bg-transparent relative overflow-hidden flex items-center justify-center py-24">
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="scroll-container w-full max-w-7xl">
            <div className="infinite-scroll flex gap-4 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${(index % images.length) + 1}`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
