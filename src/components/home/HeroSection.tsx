import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ShinyButton } from "../ui/shiny-button";
import logo from "../../assets/logo/logos.png";
import video from "../../assets/hero/v1.mp4";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl text-[#957E5B]"
              style={{
                fontFamily: "'Great Vibes', cursive",
                letterSpacing: "0.5px",
              }}
            >
              The
            </motion.span>

            {/* Line container with logo */}
            <div className="flex-1 max-w-xs relative">
              {/* Logo positioned above the line - INCREASED SIZE */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="absolute left-1/2 -translate-x-1/2 -top-18 md:-top-24 lg:-top-34"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-13 h-13 md:w-24 md:h-18 lg:w-29 lg:h-29 xl:w-50 xl:h-50 object-contain"
                />
              </motion.div>

              {/* The line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-[1px] mt-8 bg-white/40 origin-left"
              />
            </div>

            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs md:text-sm font-semibold tracking-[0.3em] md:tracking-[0.38em] text-white/85 uppercase whitespace-nowrap"
              style={{ fontFamily: "var(--font-family-montserrat)" }}
            >
              EST.2018
            </motion.span>
          </motion.div>

          {/* Main brand text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light mb-8 text-white leading-[0.9] tracking-[0.01em]"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
            }}
          >
            Luxury Reimagined.
            <br className="hidden md:block" />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm md:text-base tracking-[0.55em] md:tracking-[0.75em] uppercase text-white/85 mb-12"
            style={{ fontFamily: "var(--font-family-montserrat)" }}
          >
            Preloved. Authentic.
          </motion.p>

          {/* CTA Buttons with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ShinyButton children="Shop Now" />

            <Link
              to="/about"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Shine effect overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)",
                }}
              />

              {/* Purple gradient on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(79, 70, 229, 0.3) 100%)",
                }}
              />

              <span className="relative z-10">Learn More</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>

      {/* Add shimmer animation keyframes */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(200%);
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
