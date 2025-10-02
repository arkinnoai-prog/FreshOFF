// src/pages/ProductDetailPage.tsx
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[var(--color-neon-pink)] mb-4">
            Product Not Found
          </h2>
          <button onClick={() => navigate("/shop")} className="btn-cyber">
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
    <div
      className="pt-24 pb-20 min-h-screen"
      style={{ background: "var(--color-cyber-black)" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card-cyber p-4 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded"
                style={{ filter: "brightness(0.9) contrast(1.1)" }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`card-cyber p-2 ${
                    selectedImage === index
                      ? "ring-2 ring-[var(--color-neon-pink)]"
                      : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover rounded"
                    style={{ filter: "brightness(0.9) contrast(1.1)" }}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-4">
              <p
                className="text-[var(--color-neon-pink)] text-sm mb-2"
                style={{ fontFamily: "var(--font-family-share-tech)" }}
              >
                {product.category}
              </p>
              <h1 className="text-4xl font-bold mb-4 text-gradient-cyber uppercase">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating)
                          ? "text-[var(--color-neon-pink)] fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-[var(--color-neon-pink)]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)] rounded text-sm">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>

              <p className="text-gray-400 mb-6">{product.description}</p>

              {/* Color Selection */}
              {product.colors && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded border-2 transition-all ${
                          selectedColor === color
                            ? "border-[var(--color-neon-pink)] bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)]"
                            : "border-gray-600 text-gray-400 hover:border-[var(--color-neon-pink)]"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded border border-gray-600 text-gray-400 hover:border-[var(--color-neon-pink)] hover:text-[var(--color-neon-pink)] transition-all"
                  >
                    -
                  </button>
                  <span className="text-xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded border border-gray-600 text-gray-400 hover:border-[var(--color-neon-pink)] hover:text-[var(--color-neon-pink)] transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="btn-cyber flex-1 flex items-center justify-center gap-2"
                >
                  <FiShoppingCart />
                  ADD TO CART
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded border-2 transition-all ${
                    isInWishlist(product.id)
                      ? "border-[var(--color-neon-pink)] bg-[var(--color-neon-pink)]/20 text-[var(--color-neon-pink)]"
                      : "border-gray-600 text-gray-400 hover:border-[var(--color-neon-pink)]"
                  }`}
                >
                  <FiHeart
                    className={isInWishlist(product.id) ? "fill-current" : ""}
                  />
                </button>
                <button className="p-3 rounded border-2 border-gray-600 text-gray-400 hover:border-[var(--color-neon-pink)] hover:text-[var(--color-neon-pink)] transition-all">
                  <FiShare2 />
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3 border-t border-gray-800 pt-6">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiTruck className="text-[var(--color-neon-pink)]" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiShield className="text-[var(--color-neon-pink)]" />
                  <span>Secure payment & data protection</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <FiRefreshCw className="text-[var(--color-neon-pink)]" />
                  <span>30-day return policy</span>
                </div>
              </div>

              {/* Product Details */}
              {(product.material || product.dimensions) && (
                <div className="border-t border-gray-800 pt-6 mt-6">
                  <h3 className="font-bold mb-3">Product Details</h3>
                  <dl className="space-y-2 text-gray-400">
                    {product.material && (
                      <>
                        <dt className="inline font-semibold">Material: </dt>
                        <dd className="inline">{product.material}</dd>
                        <br />
                      </>
                    )}
                    {product.dimensions && (
                      <>
                        <dt className="inline font-semibold">Dimensions: </dt>
                        <dd className="inline">{product.dimensions}</dd>
                      </>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 text-gradient-cyber text-center">
              RELATED PRODUCTS
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
