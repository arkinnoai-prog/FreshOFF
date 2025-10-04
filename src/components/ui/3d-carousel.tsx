import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Louis from "../../assets/brands/Louis_Vuitton_logo_and_wordmark (1).svg";
import LongChamp from "../../assets/brands/Longchamp_logo.svg.png";
import Flurla from "../../assets/brands/furla-logo-black-and-white.png";
import MiuMiu from "../../assets/brands/Miu_Miu-Logo.wine.png";
import MichaelKors from "../../assets/brands/Michael_Kors_(brand)_logo.svg.png";
import Hermes from "../../assets/brands/Hermes-Logo.png";
import Fendi from "../../assets/brands/fendi-logo-png-transparent.png";
import Bottega from "../../assets/brands/Bottega-Veneta-Logo.png";
import Burbery from "../../assets/brands/5842a0c1a6515b1e0ad75af2.png";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = () => {
    setMatches(getMatches(query));
  };

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

// Brand data with names and image URLs
const brands = [
  {
    name: "Louis Vuitton",
    image: Louis,
  },
  {
    name: "Hermes",
    image: Hermes,
  },
  {
    name: "Longchamp",
    image: LongChamp, // Replace with actual image path
  },
  {
    name: "Michael Kors",
    image: MichaelKors,
  },

  {
    name: "Bottega Veneta",
    image: Bottega,
  },
  {
    name: "Fendi",
    image: Fendi,
  },
  {
    name: "Furla",
    image: Flurla,
  },
  {
    name: "Miu Miu",
    image: MiuMiu,
  },
  {
    name: "Burberry",
    image: Burbery,
  },
];

const duration = 0.15;
const transition = {
  duration,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};
const transitionOverlay = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

const Carousel = memo(
  ({
    handleClick,
    controls,
    brandData,
    isCarouselActive,
  }: {
    handleClick: (brand: (typeof brands)[0], index: number) => void;
    controls: any;
    brandData: typeof brands;
    isCarouselActive: boolean;
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 940px)");
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
    const faceCount = brandData.length;
    const faceWidth = cylinderWidth / faceCount;
    const radius = cylinderWidth / (2 * Math.PI);
    const rotation = useMotionValue(0);
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    );

    return (
      <div
        className="flex h-full items-center justify-center bg-mauve-dark-2"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {brandData.map((brand, i) => (
            <motion.div
              key={`brand-${brand.name}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(brand, i)}
            >
              <div className="flex flex-col items-center justify-center w-full">
                <motion.img
                  src={brand.image}
                  alt={brand.name}
                  layoutId={`img-${brand.name}`}
                  className="pointer-events-none w-full rounded-xl object-cover aspect-square"
                  initial={{ filter: "blur(4px)" }}
                  layout="position"
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />
                <p className="mt-2 text-white text-sm font-medium">
                  {brand.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

function ThreeDPhotoCarousel() {
  const [activeBrand, setActiveBrand] = useState<(typeof brands)[0] | null>(
    null
  );
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const controls = useAnimation();

  const handleClick = (brand: (typeof brands)[0]) => {
    setActiveBrand(brand);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveBrand(null);
    setIsCarouselActive(true);
  };

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeBrand && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeBrand.name}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl" // Changed from bg-black to bg-white
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <div className="flex flex-col items-center">
              <motion.img
                layoutId={`img-${activeBrand.name}`}
                src={activeBrand.image}
                alt={activeBrand.name}
                className="max-w-full max-h-[70vh] rounded-lg shadow-lg"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  willChange: "transform",
                }}
              />
              <motion.h2
                className="text-black text-2xl font-bold mt-4" // Changed from text-white to text-black
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                {activeBrand.name}
              </motion.h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          brandData={brands}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}

export { ThreeDPhotoCarousel };
