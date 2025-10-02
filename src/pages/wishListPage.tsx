import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/cartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiHeart className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-400 mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 mb-8">
            Save your favorite items for later!
          </p>
          <Link to="/shop" className="btn-cyber">
            EXPLORE PRODUCTS
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
          YOUR WISHLIST
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card-cyber group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ filter: "brightness(0.9) contrast(1.1)" }}
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500/80 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-lg mb-2 text-[var(--color-neon-pink)] hover:text-[var(--color-hot-pink)] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-3">{product.category}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[var(--color-neon-pink)]">
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
                  className="btn-cyber w-full text-center flex items-center justify-center gap-2"
                >
                  <FiShoppingCart />
                  ADD TO CART
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
