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
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      {/* Background Effect */}
      <div className="fixed inset-0 neon-grid opacity-10" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-6xl md:text-7xl font-bold mb-4 text-gradient-neon"
            style={{ fontFamily: "var(--font-family-bebas)" }}
          >
            SHOP COLLECTION
          </h1>
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: "var(--font-family-montserrat)" }}
          >
            {filteredProducts.length} Premium Products Available
          </p>
        </motion.div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline-neon flex items-center gap-2 py-2 px-4 text-sm"
            >
              <FiFilter />
              Filters
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  viewMode === "grid"
                    ? "border-[#39FF14] text-[#39FF14] bg-[#39FF14]/10"
                    : "border-gray-600 text-gray-400 hover:border-gray-400"
                }`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  viewMode === "list"
                    ? "border-[#39FF14] text-[#39FF14] bg-[#39FF14]/10"
                    : "border-gray-600 text-gray-400 hover:border-gray-400"
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
                className="input-modern pl-4 pr-10 py-2 text-sm"
                style={{ minWidth: "250px" }}
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-modern py-2 px-4 text-sm"
              style={{ background: "rgba(21, 0, 39, 0.6)" }}
            >
              {sortOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ background: "#150027" }}
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
              <div className="card-modern p-6 sticky top-24">
                <h3
                  className="text-2xl font-bold mb-6 text-gradient-gold"
                  style={{ fontFamily: "var(--font-family-bebas)" }}
                >
                  FILTERS
                </h3>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-white">Categories</h4>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left py-3 px-4 rounded-lg mb-2 transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#FF1493]/20 to-[#9D00FF]/20 text-[#FF1493] border-l-4 border-[#FF1493]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-white">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-[#39FF14]"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">${priceRange[0]}</span>
                      <span className="text-[#39FF14] font-bold">
                        ${priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-white">Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Pink", "Blue", "Green", "Gold", "Black", "White"].map(
                      (color) => (
                        <button
                          key={color}
                          className="px-4 py-2 text-xs border border-[#00E5FF]/30 rounded-full text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all"
                        >
                          {color}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-semibold mb-4 text-white">
                    Popular Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["New", "Sale", "Limited", "Trending", "Premium"].map(
                      (tag) => (
                        <button
                          key={tag}
                          className="px-3 py-1 text-xs bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 border border-[#39FF14]/30 rounded-full text-[#39FF14] hover:bg-[#39FF14]/20 transition-all"
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
                  <FiX className="text-6xl text-gray-600 mx-auto mb-4" />
                  <p className="text-2xl text-gray-400 mb-2">
                    No products found
                  </p>
                  <p className="text-gray-500">Try adjusting your filters</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
