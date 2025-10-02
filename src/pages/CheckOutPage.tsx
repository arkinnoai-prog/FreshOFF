import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCreditCard, FiLock, FiCheck } from "react-icons/fi";
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
      // Process payment
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    }
  };

  const total =
    getCartTotal() + (getCartTotal() > 100 ? 0 : 10) + getCartTotal() * 0.08;

  return (
    <div
      className="pt-24 pb-20 min-h-screen"
      style={{ background: "var(--color-cyber-black)" }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-8 text-gradient-cyber text-center"
        >
          CHECKOUT
        </motion.h1>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {["Shipping", "Payment", "Confirm"].map((label, index) => (
            <div key={index} className="flex-1">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step > index + 1
                      ? "bg-[var(--color-neon-pink)] border-[var(--color-neon-pink)]"
                      : step === index + 1
                      ? "border-[var(--color-neon-pink)] text-[var(--color-neon-pink)]"
                      : "border-gray-600 text-gray-600"
                  }`}
                >
                  {step > index + 1 ? <FiCheck /> : index + 1}
                </div>
                {index < 2 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      step > index + 1
                        ? "bg-[var(--color-neon-pink)]"
                        : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
              <p className="text-sm mt-2 text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Shipping */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-cyber p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-neon-pink)]">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-cyber"
                  required
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input-cyber"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input-cyber"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-cyber"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-cyber"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="input-cyber"
                  required
                />
              </div>
              <button type="submit" className="btn-cyber mt-6">
                CONTINUE TO PAYMENT
              </button>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-cyber p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-neon-pink)]">
                Payment Information
              </h2>
              <div className="mb-4 flex items-center gap-2 text-gray-400">
                <FiLock className="text-[var(--color-neon-pink)]" />
                <span>Secure encrypted payment</span>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="input-cyber w-full"
                  required
                />
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on Card"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="input-cyber w-full"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    className="input-cyber"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="input-cyber"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded hover:border-[var(--color-neon-pink)] transition-all"
                >
                  BACK
                </button>
                <button type="submit" className="btn-cyber flex-1">
                  REVIEW ORDER
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-cyber p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-[var(--color-neon-pink)]">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex justify-between"
                  >
                    <span className="text-gray-400">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="text-[var(--color-neon-pink)]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[var(--color-neon-pink)]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--color-cyber-gray)]/50 rounded p-4 mb-6">
                <h3 className="font-bold mb-2">Shipping Address</h3>
                <p className="text-gray-400">
                  {formData.firstName} {formData.lastName}
                  <br />
                  {formData.address}
                  <br />
                  {formData.city}, {formData.zipCode}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-gray-600 text-gray-400 rounded hover:border-[var(--color-neon-pink)] transition-all"
                >
                  BACK
                </button>
                <button
                  type="submit"
                  className="btn-cyber flex-1 flex items-center justify-center gap-2"
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
