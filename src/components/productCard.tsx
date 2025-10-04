// src/components/ProductCard.tsx - Professional and Elegant Design
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";
import { useCart } from "../context/cartContext";
import type { Product } from "../types";
import { useWishlist } from "../context/wishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-[#1a0033]/40 rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
    >
      <div className="relative">
        {/* Image Container */}
        <div
          className="aspect-square overflow-hidden bg-[#150027] cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#150027]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-white text-[#150027] text-xs font-semibold rounded-full">
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle();
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isInWishlist(product.id)
                  ? "bg-white text-[#150027]"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              <FiHeart
                className={isInWishlist(product.id) ? "fill-current" : ""}
              />
            </motion.button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 border border-white/20 transition-all"
            >
              <FiEye />
            </button>
          </div>

          {/* Add to Cart Button - Elegant Slide Up */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="absolute bottom-0 left-0 right-0 bg-white text-[#150027] py-4 flex items-center justify-center gap-2 font-semibold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0"
          >
            <FiShoppingCart className="text-lg" />
            Add to Cart
          </motion.button>
        </div>

        {/* Product Information */}
        <div className="p-6">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating)
                    ? "text-white fill-current"
                    : "text-gray-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-2">
              ({product.reviews})
            </span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3
              className="font-medium text-lg mb-2 text-white hover:text-gray-300 transition-colors line-clamp-1"
              style={{ fontFamily: "var(--font-family-inter)" }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Category */}
          <p
            className="text-gray-500 text-sm mb-4 uppercase tracking-wider"
            style={{ fontFamily: "var(--font-family-space)", fontSize: "12px" }}
          >
            {product.category}
          </p>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-family-playfair)" }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Tags - Subtle and Elegant */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Stock Status or Special Badge */}
          {product.stock && product.stock < 10 && (
            <div className="mt-3 text-xs text-gray-400">
              Only {product.stock} left in stock
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
