// src/pages/CartPage.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiArrowLeft,
} from "react-icons/fi";
import { useCart } from "../context/cartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-400 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8">
            Add some cyber gear to get started!
          </p>
          <Link to="/shop" className="btn-cyber">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pt-24 pb-20 min-h-screen"
      style={{ background: "var(--color-cyber-black)" }}
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-8 text-gradient-cyber text-center"
        >
          YOUR CART
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
                className="card-cyber p-6"
              >
                <div className="flex gap-6">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded"
                    style={{ filter: "brightness(0.9) contrast(1.1)" }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-xl font-bold text-[var(--color-neon-pink)]">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <p className="text-gray-500 mb-2">
                      {item.product.category}
                    </p>
                    {item.selectedColor && (
                      <p className="text-sm text-gray-400 mb-3">
                        Color: {item.selectedColor}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded border border-gray-600 text-gray-400 hover:border-[var(--color-neon-pink)] hover:text-[var(--color-neon-pink)] transition-all flex items-center justify-center"
                        >
                          <FiMinus />
                        </button>
                        <span className="font-bold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded border border-gray-600 text-gray-400 hover:border-[var(--color-neon-pink)] hover:text-[var(--color-neon-pink)] transition-all flex items-center justify-center"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--color-neon-pink)]">
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

            <div className="flex gap-4">
              <Link to="/shop" className="btn-cyber flex items-center gap-2">
                <FiArrowLeft />
                CONTINUE SHOPPING
              </Link>
              <button
                onClick={clearCart}
                className="px-6 py-3 border border-red-500 text-red-500 rounded hover:bg-red-500/10 transition-all"
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
              className="card-cyber p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6 text-gradient-cyber">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{getCartTotal() > 100 ? "FREE" : "$10.00"}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[var(--color-neon-pink)]">
                      $
                      {(
                        getCartTotal() +
                        (getCartTotal() > 100 ? 0 : 10) +
                        getCartTotal() * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-cyber w-full text-center block"
              >
                PROCEED TO CHECKOUT
              </Link>

              <div className="mt-6 p-4 bg-[var(--color-neon-pink)]/10 rounded border border-[var(--color-neon-pink)]/30">
                <p className="text-sm text-[var(--color-neon-pink)]">
                  🎉 You qualify for FREE SHIPPING!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
