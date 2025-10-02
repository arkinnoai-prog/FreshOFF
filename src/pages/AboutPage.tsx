import { motion } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiTruck,
  FiHeart,
  FiTarget,
  FiTrendingUp,
  FiGlobe,
  FiZap,
} from "react-icons/fi";

const AboutPage = () => {
  const stats = [
    {
      icon: FiUsers,
      value: "100K+",
      label: "Happy Customers",
      color: "#FF1493",
    },
    { icon: FiAward, value: "25+", label: "Awards Won", color: "#FFD700" },
    {
      icon: FiTruck,
      value: "500K+",
      label: "Orders Delivered",
      color: "#39FF14",
    },
    {
      icon: FiHeart,
      value: "99.9%",
      label: "Satisfaction Rate",
      color: "#00E5FF",
    },
  ];

  const team = [
    {
      name: "Alexandra Chen",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      bio: "Visionary leader with 20 years in luxury fashion",
      gradient: "from-[#FF1493] to-[#9D00FF]",
    },
    {
      name: "Marcus Rivera",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Award-winning designer from Paris Fashion Week",
      gradient: "from-[#00E5FF] to-[#39FF14]",
    },
    {
      name: "Priya Sharma",
      role: "Head of Innovation",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Tech pioneer revolutionizing fashion retail",
      gradient: "from-[#FFD700] to-[#FF6600]",
    },
  ];

  const values = [
    {
      icon: FiTarget,
      title: "Our Mission",
      desc: "To redefine luxury fashion with innovative designs that empower modern individuals.",
    },
    {
      icon: FiTrendingUp,
      title: "Our Vision",
      desc: "Becoming the global leader in sustainable luxury accessories by 2030.",
    },
    {
      icon: FiGlobe,
      title: "Our Reach",
      desc: "Serving fashion enthusiasts in over 50 countries worldwide.",
    },
    {
      icon: FiZap,
      title: "Our Innovation",
      desc: "Integrating cutting-edge technology with timeless craftsmanship.",
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 neon-grid opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1
              className="text-6xl md:text-8xl font-bold mb-6 text-gradient-neon"
              style={{ fontFamily: "var(--font-family-bebas)" }}
            >
              THE FRESHOFF STORY
            </h1>
            <p
              className="text-xl text-gray-300 mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-family-montserrat)" }}
            >
              Born from a passion for exceptional design and a commitment to
              sustainability, FreshOff is more than a brand – it's a movement
              towards conscious luxury.
            </p>
            <div className="inline-flex gap-4">
              <motion.div
                className="px-6 py-2 bg-gradient-to-r from-[#FF1493]/20 to-[#9D00FF]/20 rounded-full border border-[#FF1493]/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#FF1493] font-semibold">Est. 2020</span>
              </motion.div>
              <motion.div
                className="px-6 py-2 bg-gradient-to-r from-[#39FF14]/20 to-[#00E5FF]/20 rounded-full border border-[#39FF14]/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-[#39FF14] font-semibold">
                  Premium Quality
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF1493]/5 via-transparent to-[#00E5FF]/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                    border: `2px solid ${stat.color}40`,
                  }}
                >
                  <stat.icon
                    className="text-3xl"
                    style={{ color: stat.color }}
                  />
                </div>
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-5xl font-bold mb-6 text-gradient-gold"
                style={{ fontFamily: "var(--font-family-bebas)" }}
              >
                CRAFTING EXCELLENCE SINCE DAY ONE
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  FreshOff began in a small studio with a big dream: to create
                  bags that don't just carry your essentials, but elevate your
                  entire lifestyle. Our founders saw a gap in the market for
                  truly innovative, sustainable luxury accessories.
                </p>
                <p>
                  Today, we've grown into a global brand, but our core values
                  remain unchanged. Every FreshOff bag is a testament to our
                  commitment to quality, innovation, and environmental
                  responsibility.
                </p>
                <p>
                  From ethically sourced materials to carbon-neutral shipping,
                  we're proving that luxury and sustainability can coexist
                  beautifully.
                </p>
              </div>
              <button className="btn-neon mt-6">
                Learn More About Our Process
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-modern p-4">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                  alt="Our workshop"
                  className="w-full h-[500px] object-cover rounded-xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#FF1493]/30 to-[#9D00FF]/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-br from-[#39FF14]/30 to-[#00E5FF]/30 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-12 text-gradient-neon"
            style={{ fontFamily: "var(--font-family-bebas)" }}
          >
            WHAT DRIVES US
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-modern p-6 hover:scale-105 transition-transform"
              >
                <value.icon className="text-3xl text-[#00E5FF] mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-12 text-gradient-gold"
            style={{ fontFamily: "var(--font-family-bebas)" }}
          >
            MEET THE VISIONARIES
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-modern p-8 text-center group hover:scale-105 transition-transform"
              >
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}
                  />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-full h-full object-cover rounded-full border-4 border-white/10"
                  />
                </div>
                <h3
                  className={`text-2xl font-bold mb-2 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}
                >
                  {member.name}
                </h3>
                <p className="text-[#00E5FF] mb-3 font-semibold">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF1493]/10 via-[#9D00FF]/10 to-[#00E5FF]/10" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-modern p-12 text-center max-w-3xl mx-auto"
          >
            <h2
              className="text-5xl font-bold mb-6 text-gradient-neon"
              style={{ fontFamily: "var(--font-family-bebas)" }}
            >
              JOIN THE FRESHOFF FAMILY
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of a community that values quality, innovation, and
              conscious luxury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-neon">SHOP NOW</button>
              <button className="btn-outline-neon">BECOME A MEMBER</button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
