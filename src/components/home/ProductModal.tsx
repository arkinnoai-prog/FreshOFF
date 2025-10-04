import { motion } from "framer-motion";
import { FiX, FiShoppingCart } from "react-icons/fi";
import { ShoppingBag, Star, Package } from "lucide-react";
import { useState } from "react";

export interface Bag {
  id: number;
  name: string;
  title: string;
  image: string;
  bgColor: string;
  primaryColor: string;
  price?: string;
  rating?: number;
  features?: string[];
  description?: string;
  additionalImages?: string[];
}
interface ProductModalProps {
  bag: Bag | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ bag, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!bag) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-[fadeIn_0.3s_ease-out]"
      onMouseMove={handleMouseMove}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="relative w-[1200px] max-w-[90vw] h-[700px] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl animate-[modalSlideIn_0.4s_ease-out] flex"
        style={{
          background: `linear-gradient(135deg, ${bag.primaryColor} 0%, ${bag.primaryColor}ee 50%, ${bag.primaryColor}cc 100%)`,
          boxShadow: `0 25px 50px rgba(0,0,0,0.7), 0 0 100px ${bag.primaryColor}66`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
        >
          <FiX size={24} />
        </button>

        {/* Animated background shine */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)`,
              animation: "shimmer 2s infinite",
            }}
          ></div>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 40%)`,
            }}
          ></div>
        </div>

        {/* Left Section - Product Images */}
        <div className="relative z-10 w-1/2 p-8 flex flex-col justify-center">
          {/* Main Image */}
          <div className="relative w-full h-116 rounded-2xl overflow-hidden mb-4">
            <img
              src={bag.additionalImages?.[selectedImageIndex] || bag.image}
              alt={bag.name}
              className="w-full h-full object-cover"
            />
            {/* Image overlay effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                }}
              ></div>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4 justify-center">
            {bag.additionalImages?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-24 h-24 rounded-xl overflow-hidden transition-all ${
                  selectedImageIndex === index
                    ? "ring-2 ring-white scale-110"
                    : "ring-1 ring-white/30 hover:ring-white/60"
                }`}
              >
                <img
                  src={img}
                  alt={`${bag.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {selectedImageIndex !== index && (
                  <div className="absolute inset-0 bg-black/30"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="relative z-10 w-1/2 h-full overflow-y-auto custom-scrollbar">
          <div className="p-8">
            <div className="space-y-5 text-white">
              <div>
                <h3 className="text-4xl font-bold mb-2">{bag.name}</h3>
                <p className="text-white/80 text-lg">{bag.title}</p>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-white">{bag.price}</div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(bag.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-white/70">({bag.rating})</span>
              </div>

              {/* Description */}
              <p className="text-base text-white/90 leading-relaxed">
                {bag.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-white">Features</h4>
                {bag.features?.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                      <Package size={16} className="text-white" />
                    </div>
                    <span className="text-base text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button className="w-full bg-white text-black font-bold py-4 px-6 rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 group text-lg">
                  <ShoppingBag
                    size={24}
                    className="group-hover:animate-bounce"
                  />
                  <span>Buy Now</span>
                </button>

                <button className="w-full bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 group text-lg border border-white/30">
                  <FiShoppingCart
                    size={24}
                    className="group-hover:animate-bounce"
                  />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
