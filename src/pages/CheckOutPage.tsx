import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCreditCard,
  FiLock,
  FiCheck,
  FiPackage,
  FiUser,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../context/cartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast.success("Order placed successfully! 🎉");
      clearCart();
      navigate("/");
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: "Shipping", icon: FiPackage },
    { number: 2, title: "Payment", icon: FiCreditCard },
    { number: 3, title: "Review", icon: FiCheck },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-8 text-gradient-neon text-center"
          style={{ fontFamily: "var(--font-family-bebas)" }}
        >
          CHECKOUT
        </motion.h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700" />
          {steps.map((s, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                  step > s.number
                    ? "bg-gradient-to-r from-[#39FF14] to-[#00E5FF] text-black"
                    : step === s.number
                    ? "bg-gradient-to-r from-[#FF1493] to-[#9D00FF] text-white shadow-lg shadow-[#FF1493]/50"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {step > s.number ? <FiCheck /> : <s.icon />}
              </motion.div>
              <p
                className={`text-sm mt-2 ${
                  step >= s.number ? "text-white" : "text-gray-500"
                }`}
              >
                {s.title}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Shipping */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-modern p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient-gold flex items-center gap-2">
                <FiPackage />
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-modern"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-modern"
                  required
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-modern"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-modern"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-modern md:col-span-2"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-modern"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="input-modern"
                  required
                />
              </div>
              <button type="submit" className="btn-neon mt-6 w-full">
                CONTINUE TO PAYMENT
              </button>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-modern p-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient-gold flex items-center gap-2">
                <FiCreditCard />
                Payment Information
              </h2>
              <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 rounded-lg border border-[#39FF14]/30">
                <FiLock className="text-[#39FF14]" />
                <span className="text-sm text-gray-300">
                  Your payment information is encrypted and secure
                </span>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="input-modern w-full"
                  required
                />
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="input-modern w-full"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className="input-modern"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="input-modern"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline-neon flex-1"
                >
                  BACK
                </button>
                <button type="submit" className="btn-neon flex-1">
                  REVIEW ORDER
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Order Items */}
              <div className="card-modern p-8">
                <h2 className="text-3xl font-bold mb-6 text-gradient-gold">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="flex justify-between py-3 border-b border-gray-800"
                    >
                      <div>
                        <span className="text-white font-semibold">
                          {item.product.name}
                        </span>
                        <span className="text-gray-400 ml-2">
                          x{item.quantity}
                        </span>
                        {item.selectedColor && (
                          <span className="text-[#00E5FF] text-sm ml-2">
                            ({item.selectedColor})
                          </span>
                        )}
                      </div>
                      <span className="text-[#FFD700] font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-[#39FF14]">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold pt-4 border-t border-gray-700">
                    <span className="text-white">Total</span>
                    <span className="text-gradient-neon">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card-modern p-8">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <FiUser />
                  Shipping Address
                </h3>
                <p className="text-gray-300">
                  {formData.firstName} {formData.lastName}
                  <br />
                  {formData.address}
                  <br />
                  {formData.city}, {formData.zipCode}
                  <br />
                  {formData.email}
                  <br />
                  {formData.phone}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-outline-neon flex-1"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="btn-neon flex-1 flex items-center justify-center gap-2"
                >
                  <FiCreditCard />
                  PLACE ORDER
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
