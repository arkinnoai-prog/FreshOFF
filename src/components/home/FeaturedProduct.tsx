import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { products } from "../../data/product";
import ProductCard from "../productCard";
import { ShinyButton } from "../ui/shiny-button";

const FeaturedProducts = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-family-playfair)" }}
          >
            FEATURED COLLECTION
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Handpicked luxury items for the discerning fashionista
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <ShinyButton children="View All Products" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
