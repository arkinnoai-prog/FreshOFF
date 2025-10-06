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
      </div>

      <div className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
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
            Checkout
          </motion.h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10" />
            {steps.map((s, index) => (
              <div key={index} className="relative flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                    step > s.number
                      ? "bg-[#957E5B] text-white"
                      : step === s.number
                      ? "bg-white text-[#160B26] shadow-lg shadow-white/20"
                      : "bg-white/10 text-white/40 backdrop-blur-sm"
                  }`}
                >
                  {step > s.number ? <FiCheck /> : <s.icon />}
                </motion.div>
                <p
                  className={`text-sm mt-2 ${
                    step >= s.number ? "text-white" : "text-white/40"
                  }`}
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                  }}
                >
                  {s.title.toUpperCase()}
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
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 glass-effect-dark"
              >
                <h2
                  className="text-3xl font-light mb-6 text-white flex items-center gap-3"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
                >
                  <FiPackage className="text-[#957E5B]" />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all md:col-span-2"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider"
                >
                  CONTINUE TO PAYMENT
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 glass-effect-dark"
              >
                <h2
                  className="text-3xl font-light mb-6 text-white flex items-center gap-3"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
                >
                  <FiCreditCard className="text-[#957E5B]" />
                  Payment Information
                </h2>
                <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-[#957E5B]/10 rounded-lg border border-[#957E5B]/30">
                  <FiLock className="text-[#957E5B]" />
                  <span className="text-sm text-white/60">
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
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on Card"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border border-white/20 text-white/60 rounded-full hover:bg-white/5 hover:text-white transition-all text-sm tracking-wider"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider"
                  >
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
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 glass-effect-dark">
                  <h2
                    className="text-3xl font-light mb-6 text-white"
                    style={{
                      fontFamily:
                        "var(--font-family-playfair), 'Cormorant Garamond', serif",
                    }}
                  >
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor}`}
                        className="flex justify-between py-3 border-b border-white/10"
                      >
                        <div>
                          <span className="text-white font-medium">
                            {item.product.name}
                          </span>
                          <span className="text-white/50 ml-2">
                            x{item.quantity}
                          </span>
                          {item.selectedColor && (
                            <span className="text-[#957E5B] text-sm ml-2">
                              ({item.selectedColor})
                            </span>
                          )}
                        </div>
                        <span className="text-[#957E5B] font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-4">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Shipping</span>
                      <span className="text-[#957E5B]">
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-light pt-4 border-t border-white/10">
                      <span className="text-white">Total</span>
                      <span className="text-[#957E5B]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-8 glass-effect-dark">
                  <h3
                    className="text-xl font-light mb-4 text-white flex items-center gap-2"
                    style={{
                      fontFamily:
                        "var(--font-family-playfair), 'Cormorant Garamond', serif",
                    }}
                  >
                    <FiUser className="text-[#957E5B]" />
                    Shipping Address
                  </h3>
                  <p
                    className="text-white/60"
                    style={{
                      fontFamily:
                        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                      lineHeight: "1.8",
                    }}
                  >
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
                    className="flex-1 px-6 py-3 border border-white/20 text-white/60 rounded-full hover:bg-white/5 hover:text-white transition-all text-sm tracking-wider"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider flex items-center justify-center gap-2"
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

export default CheckoutPage;
