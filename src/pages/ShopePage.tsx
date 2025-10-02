import { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiGrid, FiList, FiSearch } from "react-icons/fi";
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
    <div
      className="pt-24 pb-20 min-h-screen"
      style={{ background: "var(--color-cyber-black)" }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient-cyber">
            CYBER SHOP
          </h1>
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: "var(--font-family-share-tech)" }}
          >
            {filteredProducts.length} Products Available
          </p>
        </motion.div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-cyber flex items-center gap-2"
            >
              <FiFilter />
              Filters
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded border ${
                  viewMode === "grid"
                    ? "border-[var(--color-neon-pink)] text-[var(--color-neon-pink)]"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded border ${
                  viewMode === "list"
                    ? "border-[var(--color-neon-pink)] text-[var(--color-neon-pink)]"
                    : "border-gray-600 text-gray-400"
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
                className="input-cyber pr-10"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-cyber"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
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
              className="w-64 flex-shrink-0"
            >
              <div className="card-cyber p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-[var(--color-neon-pink)]">
                  FILTERS
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-gray-300">Categories</h4>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left py-2 px-3 rounded mb-1 transition-all ${
                        selectedCategory === category
                          ? "bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] border-l-2 border-[var(--color-neon-pink)]"
                          : "text-gray-400 hover:text-[var(--color-neon-pink)] hover:bg-[var(--color-neon-pink)]/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-gray-300">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                      style={{
                        background: `linear-gradient(to right, var(--color-neon-pink) 0%, var(--color-neon-pink) ${
                          priceRange[1] / 10
                        }%, var(--color-cyber-gray) ${
                          priceRange[1] / 10
                        }%, var(--color-cyber-gray) 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-bold mb-3 text-gray-300">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {["New", "Sale", "Limited", "Trending"].map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1 text-xs border border-[var(--color-neon-pink)]/30 rounded text-[var(--color-neon-pink)] hover:bg-[var(--color-neon-pink)]/20 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
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
                <p className="text-2xl text-gray-500">No products found</p>
                <p className="text-gray-600 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
