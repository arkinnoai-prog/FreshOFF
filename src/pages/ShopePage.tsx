import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";
import { products } from "../data/product";
import ProductCard from "../components/productCard";

const ShopPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(true);

  const categories = [
    "all",
    "Tote Bags",
    "Clutches",
    "Crossbody",
    "Satchels",
    "Backpacks",
  ];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Highest Rated" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="overflow-hidden bg-black relative">
      <div className="fixed inset-0 pointer-events-none z-50">
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

      {/* Main Content with Background Gradient */}
      <div
        className="pt-24 pb-20 min-h-screen relative"
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
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1
              className="text-6xl md:text-7xl font-light mb-4 text-white"
              style={{
                fontFamily:
                  "var(--font-family-playfair), 'Cormorant Garamond', serif",
                letterSpacing: "0.01em",
              }}
            >
              Shop Collection
            </h1>
            <p
              className="text-white/60 text-base tracking-wider"
              style={{
                fontFamily:
                  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
              }}
            >
              {filteredProducts.length} Premium Products Available
            </p>
          </motion.div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 py-2 px-4 text-sm border border-[#957E5B]/30 rounded-full text-[#957E5B] hover:bg-[#957E5B]/10 transition-all glass-effect-dark"
              >
                <FiFilter />
                Filters
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg border transition-all ${
                    viewMode === "grid"
                      ? "border-[#957E5B] text-[#957E5B] bg-[#957E5B]/10"
                      : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg border transition-all ${
                    viewMode === "list"
                      ? "border-[#957E5B] text-[#957E5B] bg-[#957E5B]/10"
                      : "border-white/20 text-white/60 hover:border-white/40 hover:text-white/80"
                  }`}
                >
                  <FiList />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none glass-effect-dark"
                  style={{ minWidth: "250px" }}
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-4 text-sm bg-white/5 border border-white/10 rounded-full text-white focus:border-[#957E5B]/50 focus:outline-none glass-effect-dark appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff60' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                  paddingRight: "2.5rem",
                }}
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    style={{ background: "#000" }}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-72 flex-shrink-0"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 sticky top-24 glass-effect-dark">
                  <h3
                    className="text-2xl font-light mb-6 text-white"
                    style={{
                      fontFamily:
                        "var(--font-family-playfair), 'Cormorant Garamond', serif",
                    }}
                  >
                    Filters
                  </h3>

                  {/* Categories */}
                  <div className="mb-8">
                    <h4 className="font-medium mb-4 text-white text-sm tracking-wider uppercase">
                      Categories
                    </h4>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left py-3 px-4 rounded-lg mb-2 transition-all ${
                          selectedCategory === category
                            ? "bg-[#957E5B]/20 text-[#957E5B] border-l-4 border-[#957E5B]"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                        style={{
                          fontFamily:
                            "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                          fontSize: "14px",
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="font-medium mb-4 text-white text-sm tracking-wider uppercase">
                      Price Range
                    </h4>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full accent-[#957E5B]"
                        style={{
                          background: `linear-gradient(to right, #957E5B 0%, #957E5B ${
                            priceRange[1] / 10
                          }%, #ffffff20 ${
                            priceRange[1] / 10
                          }%, #ffffff20 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">${priceRange[0]}</span>
                        <span className="text-[#957E5B] font-medium">
                          ${priceRange[1]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mb-8">
                    <h4 className="font-medium mb-4 text-white text-sm tracking-wider uppercase">
                      Colors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Pink", "Blue", "Green", "Gold", "Black", "White"].map(
                        (color) => (
                          <button
                            key={color}
                            className="px-4 py-2 text-xs border border-white/20 rounded-full text-white/60 hover:bg-white/10 hover:text-white hover:border-[#957E5B]/50 transition-all"
                          >
                            {color}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-medium mb-4 text-white text-sm tracking-wider uppercase">
                      Popular Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["New", "Sale", "Limited", "Trending", "Premium"].map(
                        (tag) => (
                          <button
                            key={tag}
                            className="px-3 py-1 text-xs bg-[#957E5B]/10 border border-[#957E5B]/30 rounded-full text-[#957E5B] hover:bg-[#957E5B]/20 transition-all"
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block"
                  >
                    <FiX className="text-6xl text-white/20 mx-auto mb-4" />
                    <p
                      className="text-2xl text-white/40 mb-2"
                      style={{
                        fontFamily:
                          "var(--font-family-playfair), 'Cormorant Garamond', serif",
                      }}
                    >
                      No products found
                    </p>
                    <p className="text-white/30">Try adjusting your filters</p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
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

        /* Glass morphism effect for dark theme */
        .glass-effect-dark {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Custom range slider styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #957E5B;
          border-radius: 50%;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #957E5B;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default ShopPage;
