import { motion } from "framer-motion";
import { stats } from "../../data/homeData";
import { ThreeDPhotoCarousel } from "../ui/3d-carousel";

const StatsSection = () => {
  return (
    <section className="py-20 relative bg-transparent">
      <h2
        className="text-5xl md:text-6xl font-bold mb-4 text-white text-center"
        style={{ fontFamily: "var(--font-family-playfair)" }}
      >
        OUR BRANDS
      </h2>
      <div className="w-full">
        <div className="min-h-[500px] flex flex-col justify-center rounded-lg space-y-4">
          <div className="p-2">
            <ThreeDPhotoCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
