import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiShoppingCart,
  FiShare2,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { useCart } from "../context/cartContext";
import { products } from "../data/product";
import { useWishlist } from "../context/wishlistContext";
import ProductCard from "../components/productCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = products.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#150027]">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#FF1493] mb-4">
            Product Not Found
          </h2>
          <button onClick={() => navigate("/shop")} className="btn-neon">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card-modern p-4 mb-4">
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? "border-[#39FF14] shadow-lg shadow-[#39FF14]/30"
                      : "border-transparent hover:border-gray-600"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/20 to-transparent" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-6">
              <p
                className="text-[#00E5FF] text-sm mb-2 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-family-space)" }}
              >
                {product.category}
              </p>
              <h1
                className="text-5xl font-bold mb-4 text-gradient-neon"
                style={{ fontFamily: "var(--font-family-bebas)" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-xl ${
                        i < Math.floor(product.rating)
                          ? "text-[#FFD700] fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl font-bold text-gradient-gold">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-[#FF1493] to-[#E91E63] text-white rounded-full text-sm font-bold">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-8">
                  <h3 className="font-bold mb-4 text-white">Select Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-[#39FF14] bg-[#39FF14]/20 text-[#39FF14]"
                            : "border-gray-600 text-gray-400 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="font-bold mb-4 text-white">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-[#FF1493] hover:text-[#FF1493] transition-all text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-white w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-600 text-gray-400 hover:border-[#39FF14] hover:text-[#39FF14] transition-all text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="btn-neon flex-1 flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="text-xl" />
                  ADD TO CART
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-4 rounded-full border-2 transition-all ${
                    isInWishlist(product.id)
                      ? "border-[#FF1493] bg-[#FF1493]/20 text-[#FF1493]"
                      : "border-gray-600 text-gray-400 hover:border-[#FF1493] hover:text-[#FF1493]"
                  }`}
                >
                  <FiHeart
                    className={`text-xl ${
                      isInWishlist(product.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
                <button className="p-4 rounded-full border-2 border-gray-600 text-gray-400 hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all">
                  <FiShare2 className="text-xl" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 card-modern">
                  <FiTruck className="text-2xl text-[#39FF14] mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Free Shipping</p>
                </div>
                <div className="text-center p-4 card-modern">
                  <FiShield className="text-2xl text-[#00E5FF] mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Secure Payment</p>
                </div>
                <div className="text-center p-4 card-modern">
                  <FiRefreshCw className="text-2xl text-[#FF1493] mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Easy Returns</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="flex gap-4 border-b border-gray-700">
            {["description", "details", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 capitalize font-semibold transition-all ${
                  activeTab === tab
                    ? "text-[#39FF14] border-b-2 border-[#39FF14]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-300 space-y-4"
              >
                <p>{product.description}</p>
                <p>
                  Experience luxury and functionality with this premium bag from
                  FreshOff's exclusive collection.
                </p>
              </motion.div>
            )}

            {activeTab === "details" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                {product.material && (
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Material</span>
                    <span className="text-white">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Dimensions</span>
                    <span className="text-white">{product.dimensions}</span>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <p className="text-gray-400">
                  No reviews yet. Be the first to review!
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2
              className="text-4xl font-bold mb-8 text-gradient-gold text-center"
              style={{ fontFamily: "var(--font-family-bebas)" }}
            >
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
