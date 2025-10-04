import { motion } from "framer-motion";
import { categories } from "../../data/homeData";
import AnimatedCategories from "./category/AnimatedCategory";
const CategoriesSection = () => {
  return (
    <section className="py-20 bg-[#150027]">
      <div className="container mx-auto px-4">
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
            SHOP BY CATEGORY
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Discover our curated collections for every occasion
          </p>
        </motion.div>

        <AnimatedCategories
          categories={categories}
          autoPlay={true}
          className="mt-8"
        />
      </div>
    </section>
  );
};

export default CategoriesSection;
