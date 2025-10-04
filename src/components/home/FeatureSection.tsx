import { motion } from "framer-motion";
import { features } from "../../data/homeData";

const FeaturesSection = () => {
  return (
    <section className="py-20 relative ">
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
            WHY CHOOSE US
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Experience luxury shopping with our premium services and guarantees
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-professional p-8 h-full text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10">
                  <feature.icon className="text-3xl text-white/70" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
