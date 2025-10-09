import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiArrowLeft,
  FiTag,
} from "react-icons/fi";
import { useCart } from "../context/cartContext";
import { useState, useEffect } from "react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
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
          <FiShoppingBag className="text-6xl md:text-8xl text-white/20 mx-auto mb-4 md:mb-6" />
          <h2
            className="text-3xl md:text-4xl font-light text-white mb-3 md:mb-4"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
            }}
          >
            Your Cart Is Empty
          </h2>
          <p
            className="text-sm md:text-base text-white/50 mb-6 md:mb-8 px-4"
            style={{
              fontFamily:
                "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
            }}
          >
            Add some amazing products to get started!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-xs md:text-sm tracking-wider"
          >
            <FiArrowLeft className="w-4 h-4" />
            CONTINUE SHOPPING
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

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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

        {/* Secondary shimmer effect - hidden on mobile for performance */}
        {!isMobile && (
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
        )}

        {/* Subtle glass reflection - hidden on mobile */}
        {!isMobile && (
          <div
            className="absolute inset-0 hidden lg:block"
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
        )}
      </div>

      <div className="pt-20 md:pt-24 pb-16 md:pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 text-white text-center"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
              letterSpacing: "0.01em",
            }}
          >
            Shopping Cart
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedColor}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 md:p-6 glass-effect-dark"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full sm:w-24 sm:h-24 md:w-32 md:h-32 h-48 sm:h-auto object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h3
                          className="text-xl md:text-2xl font-light text-white pr-2"
                          style={{
                            fontFamily:
                              "var(--font-family-playfair), 'Cormorant Garamond', serif",
                          }}
                        >
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-white/40 hover:text-[#957E5B] transition-colors flex-shrink-0"
                        >
                          <FiTrash2 className="text-lg md:text-xl" />
                        </button>
                      </div>
                      <p className="text-white/50 mb-2 text-xs md:text-sm">
                        {item.product.category}
                      </p>
                      {item.selectedColor && (
                        <p className="text-xs md:text-sm text-[#957E5B] mb-3">
                          Color: {item.selectedColor}
                        </p>
                      )}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-white/20 text-white/60 hover:border-[#957E5B] hover:text-[#957E5B] transition-all flex items-center justify-center"
                          >
                            <FiMinus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <span className="font-medium text-lg md:text-xl w-10 md:w-12 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-white/20 text-white/60 hover:border-[#957E5B] hover:text-[#957E5B] transition-all flex items-center justify-center"
                          >
                            <FiPlus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl md:text-3xl font-light text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-xs md:text-sm text-white/40">
                            ${item.product.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                <Link
                  to="/shop"
                  className="px-4 md:px-6 py-2.5 md:py-3 border border-white/20 text-white/60 rounded-full hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 text-xs md:text-sm tracking-wider"
                >
                  <FiArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  CONTINUE SHOPPING
                </Link>
                <button
                  onClick={clearCart}
                  className="px-4 md:px-6 py-2.5 md:py-3 border border-[#957E5B]/50 text-[#957E5B] rounded-full hover:bg-[#957E5B]/10 transition-all text-xs md:text-sm tracking-wider"
                >
                  CLEAR CART
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 md:p-8 glass-effect-dark"
              >
                <h2
                  className="text-2xl md:text-3xl font-light mb-4 md:mb-6 text-white"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
                >
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-4 md:mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm md:text-base text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none"
                    />
                    <button className="px-3 md:px-4 py-2 bg-[#957E5B] text-white rounded-lg hover:bg-[#7a6649] transition-all">
                      <FiTag className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div className="flex justify-between text-sm md:text-base text-white/70">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-white/70">
                    <span>Shipping</span>
                    <span className="font-medium text-[#957E5B]">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-white/70">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-3 md:pt-4">
                    <div className="flex justify-between text-xl md:text-2xl font-light">
                      <span className="text-white">Total</span>
                      <span className="text-[#957E5B]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full block text-center px-6 md:px-8 py-2.5 md:py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-xs md:text-sm tracking-wider"
                >
                  PROCEED TO CHECKOUT
                </Link>

                {shipping === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 md:mt-6 p-3 md:p-4 bg-[#957E5B]/10 rounded-lg border border-[#957E5B]/30"
                  >
                    <p className="text-xs md:text-sm text-[#957E5B] text-center font-medium">
                      🎉 You qualify for FREE SHIPPING!
                    </p>
                  </motion.div>
                )}
              </motion.div>
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

export default CartPage;
