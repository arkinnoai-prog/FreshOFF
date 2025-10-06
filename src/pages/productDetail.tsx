import { useEffect, useState } from "react";
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!product) {
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
        <div className="text-center relative z-10">
          <h2
            className="text-4xl font-light text-white mb-4"
            style={{
              fontFamily:
                "var(--font-family-playfair), 'Cormorant Garamond', serif",
            }}
          >
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider"
          >
            BACK TO SHOP
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 mb-4 glass-effect-dark">
                <div className="aspect-square overflow-hidden rounded-lg">
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
                        ? "border-[#957E5B] shadow-lg shadow-[#957E5B]/30"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#957E5B]/20 to-transparent" />
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
                  className="text-[#957E5B] text-sm mb-2 uppercase tracking-widest"
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                  }}
                >
                  {product.category}
                </p>
                <h1
                  className="text-5xl font-light mb-4 text-white"
                  style={{
                    fontFamily:
                      "var(--font-family-playfair), 'Cormorant Garamond', serif",
                  }}
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
                            ? "text-[#957E5B] fill-current"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white/50">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <span className="text-5xl font-light text-[#957E5B]">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-2xl text-white/30 line-through">
                        ${product.originalPrice}
                      </span>
                      <span className="px-3 py-1 bg-[#957E5B] text-white rounded-full text-sm font-medium">
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
                    <h3 className="font-medium mb-4 text-white text-sm tracking-wider uppercase">
                      Select Color
                    </h3>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-6 py-3 rounded-full border transition-all ${
                            selectedColor === color
                              ? "border-[#957E5B] bg-[#957E5B]/20 text-[#957E5B]"
                              : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
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
                  <h3 className="font-medium mb-4 text-white text-sm tracking-wider uppercase">
                    Quantity
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-lg border border-white/20 text-white/60 hover:border-[#957E5B] hover:text-[#957E5B] transition-all text-xl"
                    >
                      -
                    </button>
                    <span className="text-2xl font-light text-white w-16 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-lg border border-white/20 text-white/60 hover:border-[#957E5B] hover:text-[#957E5B] transition-all text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 px-6 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors flex items-center justify-center gap-2 text-sm tracking-wider"
                  >
                    <FiShoppingCart className="text-xl" />
                    ADD TO CART
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-4 rounded-full border transition-all ${
                      isInWishlist(product.id)
                        ? "border-[#957E5B] bg-[#957E5B]/20 text-[#957E5B]"
                        : "border-white/20 text-white/60 hover:border-[#957E5B] hover:text-[#957E5B]"
                    }`}
                  >
                    <FiHeart
                      className={`text-xl ${
                        isInWishlist(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button className="p-4 rounded-full border border-white/20 text-white/60 hover:border-[#957E5B] hover:text-[#957E5B] transition-all">
                    <FiShare2 className="text-xl" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg glass-effect-dark">
                    <FiTruck className="text-2xl text-[#957E5B] mx-auto mb-2" />
                    <p className="text-xs text-white/50">Free Shipping</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg glass-effect-dark">
                    <FiShield className="text-2xl text-[#957E5B] mx-auto mb-2" />
                    <p className="text-xs text-white/50">Secure Payment</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg glass-effect-dark">
                    <FiRefreshCw className="text-2xl text-[#957E5B] mx-auto mb-2" />
                    <p className="text-xs text-white/50">Easy Returns</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <div className="flex gap-4 border-b border-white/10">
              {["description", "details", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 capitalize font-medium transition-all text-sm tracking-wider ${
                    activeTab === tab
                      ? "text-[#957E5B] border-b-2 border-[#957E5B]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/60 space-y-4"
                  style={{
                    fontFamily:
                      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                    lineHeight: "1.8",
                  }}
                >
                  <p>{product.description}</p>
                  <p>
                    Experience luxury and functionality with this premium bag
                    from FreshOff's exclusive collection.
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
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-white/50">Material</span>
                      <span className="text-white">{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between py-2 border-b border-white/10">
                      <span className="text-white/50">Dimensions</span>
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
                  <p className="text-white/50">
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
                className="text-4xl font-light mb-8 text-white text-center"
                style={{
                  fontFamily:
                    "var(--font-family-playfair), 'Cormorant Garamond', serif",
                }}
              >
                You May Also Like
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

export default ProductDetailPage;
