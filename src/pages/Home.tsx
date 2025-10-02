import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiZap,
} from "react-icons/fi";

import { useState, useEffect } from "react";
import { products } from "../data/product";
import ProductCard from "../components/productCard";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const heroSlides = [
    {
      title: "CYBER ELEGANCE",
      subtitle: "Future Fashion 2024",
      description: "Where technology meets luxury",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200",
    },
    {
      title: "NEON DREAMS",
      subtitle: "Digital Collection",
      description: "Glow in the dark side of fashion",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200",
    },
    {
      title: "TECH LUXURY",
      subtitle: "Smart Bags",
      description: "Connected fashion for the digital age",
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const features = [
    { icon: FiTruck, title: "WARP SHIPPING", desc: "Instant digital delivery" },
    { icon: FiShield, title: "ENCRYPTED PAYMENT", desc: "Blockchain secured" },
    { icon: FiRefreshCw, title: "NANO RETURNS", desc: "30-day warranty" },
    { icon: FiZap, title: "PREMIUM TECH", desc: "Smart materials" },
  ];

  const categories = [
    {
      name: "CYBER TOTES",
      image:
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400",
      count: 45,
    },
    {
      name: "NEON CLUTCHES",
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400",
      count: 32,
    },
    {
      name: "HOLO BAGS",
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400",
      count: 28,
    },
    {
      name: "TECH PACKS",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      count: 19,
    },
  ];

  return (
    <div className="pt-20 bg-cyber-black overflow-hidden">
      {/* Animated Background Effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 110, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Hero Section - Fixed positioning */}
      <section className="relative h-screen overflow-hidden cyber-grid cyber-grid-static">
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 pointer-events-none z-40">
          <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-50" />
        </div>

        {/* Hero Slides Container - Fixed to prevent movement */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            {heroSlides.map(
              (slide, index) =>
                currentSlide === index && (
                  <motion.div
                    key={`slide-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <div className="relative w-full h-full">
                      {/* Background Image - Fixed positioning */}
                      <div className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyber-black via-cyber-black/50 to-transparent z-10" />
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          style={{
                            filter:
                              "hue-rotate(280deg) saturate(1.5) brightness(0.8)",
                          }}
                        />
                      </div>

                      {/* Content - Centered and fixed */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="text-center px-4 max-w-5xl">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                          >
                            <p className="font-share-tech text-neon-pink text-xl md:text-2xl mb-4 tracking-[0.5em] animate-pulse">
                              {slide.subtitle}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                          >
                            <h1
                              className="font-orbitron text-5xl md:text-8xl font-black mb-4 text-gradient-cyber tracking-wider"
                              style={{
                                textShadow:
                                  "0 0 40px rgba(255, 0, 110, 0.5), 0 0 80px rgba(255, 0, 110, 0.3)",
                                animation: "neon-pulse 2s ease-in-out infinite",
                              }}
                            >
                              {slide.title}
                            </h1>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                          >
                            <p className="font-rajdhani text-gray-400 text-lg md:text-xl mb-8">
                              {slide.description}
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                          >
                            <Link
                              to="/shop"
                              className="btn-cyber inline-flex items-center gap-2"
                            >
                              ENTER SHOP <FiArrowRight />
                            </Link>
                            <Link to="/about" className="btn-cyber">
                              LEARN MORE
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Carousel Indicators - Fixed position */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                currentSlide === index
                  ? "w-12 h-2 bg-neon-pink"
                  : "w-2 h-2 bg-gray-600 hover:bg-neon-pink/50"
              }`}
              style={{
                boxShadow: currentSlide === index ? "0 0 20px #ff006e" : "none",
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-pink/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-neon-pink/20 rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-cyber-gray rounded-lg flex items-center justify-center border border-neon-pink/30 group-hover:border-neon-pink transition-colors">
                    <feature.icon className="text-3xl text-neon-pink" />
                  </div>
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-share-tech">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-4 text-gradient-cyber">
              EXPLORE CATEGORIES
            </h2>
            <p className="text-gray-500 text-lg font-share-tech">
              Choose your digital style
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg card-cyber"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{
                      filter:
                        "hue-rotate(280deg) saturate(1.5) brightness(0.8)",
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-orbitron text-2xl font-bold mb-1 text-neon-pink">
                      {category.name}
                    </h3>
                    <p className="text-gray-400 font-share-tech">
                      {category.count} Items
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-electric-purple/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-4 text-gradient-cyber">
              FEATURED ITEMS
            </h2>
            <p className="text-gray-500 text-lg font-share-tech">
              Limited edition cyber collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="btn-cyber inline-flex items-center gap-2"
            >
              VIEW ALL <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 via-electric-purple/10 to-cyber-blue/10" />
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-4 text-gradient-cyber">
              JOIN THE CYBER CLUB
            </h2>
            <p className="text-xl mb-8 text-gray-400 font-rajdhani">
              Get 15% off and access to exclusive digital drops
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="input-cyber flex-1"
              />
              <button className="btn-cyber">SUBSCRIBE</button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
