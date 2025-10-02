// src/components/ProductCard.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye, FiStar, FiZap } from "react-icons/fi";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";
import type { Product } from "../types";

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
    <motion.div whileHover={{ y: -5 }} className="card-cyber group relative">
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink to-electric-purple opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />

      <div className="relative bg-cyber-gray/80 backdrop-blur rounded-lg overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-cyber-black">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            style={{ filter: "brightness(0.9) contrast(1.1)" }}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-neon-pink text-white px-3 py-1 rounded text-sm font-bold font-orbitron animate-pulse">
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
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className={`w-10 h-10 rounded flex items-center justify-center transition-all ${
                isInWishlist(product.id)
                  ? "bg-neon-pink text-white shadow-lg shadow-neon-pink/50"
                  : "bg-cyber-black/80 text-gray-400 hover:text-neon-pink hover:bg-cyber-black border border-neon-pink/30"
              }`}
            >
              <FiHeart
                className={isInWishlist(product.id) ? "fill-current" : ""}
              />
            </motion.button>
            <Link
              to={`/product/${product.id}`}
              className="w-10 h-10 bg-cyber-black/80 rounded flex items-center justify-center text-gray-400 hover:text-neon-pink hover:bg-cyber-black border border-neon-pink/30 transition-all"
            >
              <FiEye />
            </Link>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            onClick={() => addToCart(product)}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-neon-pink to-electric-purple text-white py-3 flex items-center justify-center gap-2 font-orbitron font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiZap className="animate-pulse" />
            ADD TO CART
          </motion.button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.rating)
                    ? "text-neon-pink fill-current"
                    : "text-gray-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1 font-share-tech">
              ({product.reviews})
            </span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-orbitron font-bold text-lg mb-1 text-gray-100 hover:text-neon-pink transition-colors uppercase">
              {product.name}
            </h3>
          </Link>

          <p className="text-gray-500 text-sm mb-2 font-share-tech">
            {product.category}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-neon-pink font-orbitron">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-600 line-through font-share-tech">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {product.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
              {product.tags.slice(0, 2).map((tag: any) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-neon-pink/10 text-neon-pink border border-neon-pink/30 rounded font-share-tech"
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
