// src/pages/HomePage.tsx - Updated with video background and new theme
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiZap,
  FiStar,
  FiAward,
  FiGlobe,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { products } from "../data/product";
import ProductCard from "../components/productCard";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const heroSlides = [
    {
      title: "LUXURY REIMAGINED",
      subtitle: "Elite Collection 2024",
      description: "Where elegance meets innovation",
      gradient: "from-[#FF1493] to-[#9D00FF]",
    },
    {
      title: "NEON DREAMS",
      subtitle: "Limited Edition",
      description: "Illuminate your style",
      gradient: "from-[#00E5FF] to-[#FF1493]",
    },
    {
      title: "FUTURE FORWARD",
      subtitle: "Smart Fashion",
      description: "Technology in every thread",
      gradient: "from-[#39FF14] to-[#00E5FF]",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const features = [
    {
      icon: FiTruck,
      title: "EXPRESS DELIVERY",
      desc: "Free shipping worldwide",
      color: "#FF1493",
    },
    {
      icon: FiShield,
      title: "SECURE PAYMENT",
      desc: "256-bit SSL encryption",
      color: "#00E5FF",
    },
    {
      icon: FiRefreshCw,
      title: "EASY RETURNS",
      desc: "30-day money back",
      color: "#39FF14",
    },
    {
      icon: FiAward,
      title: "PREMIUM QUALITY",
      desc: "Handcrafted excellence",
      color: "#FFD700",
    },
  ];

  const categories = [
    {
      name: "LUXURY TOTES",
      image:
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400",
      count: 45,
      color: "#FF1493",
    },
    {
      name: "EVENING CLUTCHES",
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400",
      count: 32,
      color: "#00E5FF",
    },
    {
      name: "DESIGNER BAGS",
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400",
      count: 28,
      color: "#39FF14",
    },
    {
      name: "TRAVEL COLLECTION",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      count: 19,
      color: "#FFD700",
    },
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers", icon: FiStar },
    { value: "100+", label: "Premium Designs", icon: FiAward },
    { value: "15+", label: "Years Experience", icon: FiGlobe },
    { value: "98%", label: "Satisfaction Rate", icon: FiShield },
  ];

  return (
    <div className="overflow-hidden bg-[#150027]">
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 20, 147, 0.15) 0%, transparent 40%)`,
        }}
      />

      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="src/assets/hero/v1.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 video-overlay" />

        <div className="relative h-full flex items-center justify-center">
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
                    className="text-center px-4 max-w-6xl"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <span className="inline-block px-6 py-2 mb-6 text-sm font-semibold tracking-wider text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        {slide.subtitle}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}
                      style={{
                        fontFamily: "var(--font-family-bebas)",
                        letterSpacing: "0.02em",
                        filter: "drop-shadow(0 0 30px rgba(255, 20, 147, 0.5))",
                      }}
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-xl md:text-2xl mb-10 text-gray-200 font-light max-w-2xl mx-auto"
                      style={{ fontFamily: "var(--font-family-montserrat)" }}
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                      <Link
                        to="/shop"
                        className="btn-neon inline-flex items-center gap-2"
                      >
                        Explore Collection <FiArrowRight className="text-lg" />
                      </Link>
                      <Link to="/about" className="btn-outline-neon">
                        Learn More
                      </Link>
                    </motion.div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4">
          {heroSlides.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                currentSlide === index
                  ? "w-16 h-2 bg-gradient-to-r from-[#FF1493] to-[#00E5FF]"
                  : "w-8 h-2 bg-white/30 hover:bg-white/50"
              } rounded-full`}
              style={{
                boxShadow:
                  currentSlide === index
                    ? "0 0 20px rgba(255, 20, 147, 0.5)"
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative neon-grid">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-[#FF1493]/20 to-[#9D00FF]/20 border border-[#FF1493]/30">
                  <stat.icon className="text-2xl text-[#FF1493]" />
                </div>
                <h3 className="text-4xl font-bold text-gradient-neon mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF1493]/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-neon">
              WHY CHOOSE US
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience luxury shopping with our premium services and
              guarantees
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card-modern p-8 h-full text-center hover:scale-105 transition-transform">
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                      border: `1px solid ${feature.color}40`,
                    }}
                  >
                    <feature.icon
                      className="text-3xl"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
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
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-gold">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover our curated collections for every occasion
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
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150027] via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <h3
                        className="text-3xl font-bold mb-2"
                        style={{ color: category.color }}
                      >
                        {category.name}
                      </h3>
                      <p className="text-white/80 font-medium">
                        {category.count} Products
                      </p>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${category.color}20 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="absolute inset-0 neon-grid opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient-neon">
              FEATURED COLLECTION
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Handpicked luxury items for the discerning fashionista
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
              className="btn-neon inline-flex items-center gap-2"
            >
              View All Products <FiArrowRight className="text-lg" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF1493]/10 via-[#9D00FF]/10 to-[#00E5FF]/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-gold">
              JOIN THE ELITE
            </h2>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              Subscribe to receive exclusive offers, early access to new
              collections, and VIP event invitations
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-modern flex-1"
              />
              <button className="btn-neon whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="mt-6 text-sm text-gray-500">
              Join 50,000+ fashion enthusiasts worldwide
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
