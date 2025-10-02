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


const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#150027]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <FiShoppingBag className="text-8xl text-gray-600 mx-auto mb-6" />
          <h2
            className="text-4xl font-bold text-gradient-neon mb-4"
            style={{ fontFamily: "var(--font-family-bebas)" }}
          >
            YOUR CART IS EMPTY
          </h2>
          <p className="text-gray-400 mb-8">
            Add some amazing products to get started!
          </p>
          <Link to="/shop" className="btn-neon inline-flex items-center gap-2">
            <FiArrowLeft />
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-8 text-gradient-neon text-center"
          style={{ fontFamily: "var(--font-family-bebas)" }}
        >
          SHOPPING CART
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-modern p-6"
              >
                <div className="flex gap-6">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gradient-gold">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-500 hover:text-[#FF1493] transition-colors"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                    <p className="text-gray-400 mb-2">
                      {item.product.category}
                    </p>
                    {item.selectedColor && (
                      <p className="text-sm text-[#00E5FF] mb-3">
                        Color: {item.selectedColor}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-10 h-10 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-[#FF1493] hover:text-[#FF1493] transition-all flex items-center justify-center"
                        >
                          <FiMinus />
                        </button>
                        <span className="font-bold text-xl w-12 text-center text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-10 h-10 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-[#39FF14] hover:text-[#39FF14] transition-all flex items-center justify-center"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gradient-neon">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${item.product.price} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex gap-4 pt-4">
              <Link
                to="/shop"
                className="btn-outline-neon flex items-center gap-2"
              >
                <FiArrowLeft />
                CONTINUE SHOPPING
              </Link>
              <button
                onClick={clearCart}
                className="px-6 py-3 border-2 border-[#FF1493] text-[#FF1493] rounded-full hover:bg-[#FF1493]/10 transition-all"
              >
                CLEAR CART
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-modern p-8 sticky top-24"
            >
              <h2
                className="text-3xl font-bold mb-6 text-gradient-gold"
                style={{ fontFamily: "var(--font-family-bebas)" }}
              >
                ORDER SUMMARY
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="input-modern flex-1 py-2"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#39FF14]/30 transition-all">
                    <FiTag />
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#39FF14]">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-gradient-neon">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-neon w-full text-center block"
              >
                PROCEED TO CHECKOUT
              </Link>

              {shipping === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 rounded-lg border border-[#39FF14]/30"
                >
                  <p className="text-sm text-[#39FF14] text-center font-semibold">
                    🎉 You qualify for FREE SHIPPING!
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
