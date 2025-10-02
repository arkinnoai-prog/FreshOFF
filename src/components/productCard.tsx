// src/components/ProductCard.tsx - Updated with new theme
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";
import { useCart } from "../context/cartContext";
import type { Product } from "../types";
import { useWishlist } from "../context/wishlistContext";


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    <motion.div whileHover={{ y: -5 }} className="card-modern group relative">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#150027] to-[#1a0033]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#150027]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {product.originalPrice && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#FF1493] to-[#E91E63] text-white text-sm font-bold rounded-full">
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              %
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isInWishlist(product.id)
                  ? "bg-[#FF1493] text-white shadow-lg shadow-[#FF1493]/50"
                  : "bg-white/10 backdrop-blur-md text-white hover:bg-[#FF1493]/20 border border-white/20"
              }`}
            >
              <FiHeart
                className={isInWishlist(product.id) ? "fill-current" : ""}
              />
            </motion.button>
            <Link
              to={`/product/${product.id}`}
              className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#00E5FF]/20 border border-white/20 transition-all"
            >
              <FiEye />
            </Link>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            onClick={() => addToCart(product)}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#FF1493] to-[#9D00FF] text-white py-4 flex items-center justify-center gap-2 font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0"
          >
            <FiShoppingCart />
            Add to Cart
          </motion.button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating)
                    ? "text-[#FFD700] fill-current"
                    : "text-gray-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-2">
              ({product.reviews})
            </span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 text-white hover:text-[#FF1493] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-gray-400 text-sm mb-4">{product.category}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient-neon">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {product.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-gradient-to-r from-[#FF1493]/10 to-[#9D00FF]/10 text-[#FF1493] rounded-full border border-[#FF1493]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
