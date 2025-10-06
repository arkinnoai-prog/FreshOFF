import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/cartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className="fixed inset-0"
          style={{
            background: `linear-gradient(135deg, 
              #160B26 0%, 
              #1a0d2a 20%,
              #1e1030 40%,
              #241435 60%,
              #2a1840 80%,
              #160B26 100%)`,
          }}
        />

        {/* Global Glass Shine Overlay */}
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
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <FiHeart className="text-8xl text-white/20 mx-auto mb-6" />
          <h2
            className="text-4xl font-light text-white mb-4"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
            }}
          >
            Your Wishlist Is Empty
          </h2>
          <p
            className="text-white/50 mb-8"
            style={{
              fontFamily:
                "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
            }}
          >
            Save your favorite items for later!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider"
          >
            <FiArrowLeft />
            EXPLORE PRODUCTS
          </Link>
        </motion.div>

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
        `}</style>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative min-h-screen">
      {/* Background Gradient */}
      <div
        className="fixed inset-0"
        style={{
          background: `linear-gradient(135deg, 
            #160B26 0%, 
            #1a0d2a 20%,
            #1e1030 40%,
            #241435 60%,
            #2a1840 80%,
            #160B26 100%)`,
        }}
      />

      {/* Global Glass Shine Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Main diagonal shine effect */}
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

        {/* Secondary shimmer effect */}
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

      <div className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-light mb-8 text-white text-center"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
              letterSpacing: "0.01em",
            }}
          >
            My Wishlist
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg group hover:scale-105 transition-transform glass-effect-dark overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#957E5B]/20 hover:border-[#957E5B]/50 hover:text-[#957E5B] transition-all shadow-lg"
                  >
                    <FiTrash2 />
                  </button>
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#957E5B] text-white text-sm font-medium rounded-full">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      %
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3
                      className="font-light text-xl mb-2 text-white hover:text-[#957E5B] transition-colors"
                      style={{
                        fontFamily:
                          "var(--font-family-playfair), 'Cormorant Garamond', serif",
                      }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <p
                    className="text-white/50 text-sm mb-3"
                    style={{
                      fontFamily:
                        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                    }}
                  >
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-light text-[#957E5B]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/30 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full px-4 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart />
                    ADD TO CART
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/60 rounded-full hover:bg-white/5 hover:text-white transition-all text-sm tracking-wider"
            >
              <FiArrowLeft />
              CONTINUE SHOPPING
            </Link>
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
      `}</style>
    </div>
  );
};

export default WishlistPage;
