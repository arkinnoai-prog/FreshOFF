import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/cartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#150027]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <FiHeart className="text-8xl text-gray-600 mx-auto mb-6" />
          <h2
            className="text-4xl font-bold text-gradient-neon mb-4"
            style={{ fontFamily: "var(--font-family-bebas)" }}
          >
            YOUR WISHLIST IS EMPTY
          </h2>
          <p className="text-gray-400 mb-8">
            Save your favorite items for later!
          </p>
          <Link to="/shop" className="btn-neon inline-flex items-center gap-2">
            <FiArrowLeft />
            EXPLORE PRODUCTS
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-8 text-gradient-neon text-center"
          style={{ fontFamily: "var(--font-family-bebas)" }}
        >
          MY WISHLIST
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card-modern group hover:scale-105 transition-transform"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-xl">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-[#FF1493] to-[#E91E63] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                >
                  <FiTrash2 />
                </button>
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#39FF14] to-[#00FF00] text-black text-sm font-bold rounded-full">
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    %
                  </div>
                )}
              </div>
              <div className="p-6">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-xl mb-2 text-gradient-gold hover:text-white transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-400 text-sm mb-3">{product.category}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-gradient-neon">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-neon w-full text-center flex items-center justify-center gap-2"
                >
                  <FiShoppingCart />
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="btn-outline-neon inline-flex items-center gap-2"
          >
            <FiArrowLeft />
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
