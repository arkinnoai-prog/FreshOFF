import { motion } from "framer-motion";
import { stats } from "../../data/homeData";
import { Component } from "../ui/image-auto-slider";

const StatsSection = () => {
  return (
    <section className="relative bg-transparent">
      <h2
        className="text-5xl md:text-6xl pt-12 font-bold mb-8 text-white text-center"
        style={{ fontFamily: "var(--font-family-playfair)" }}
      >
        OUR BRANDS
      </h2>
      <div className="w-full ">
        <Component />
      </div>
    </section>
  );
};

export default StatsSection;
