import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowRight,
  FiTag,
  FiTrendingUp,
  FiBookOpen,
} from "react-icons/fi";
import { useState } from "react";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const blogPosts = [
    {
      id: "1",
      title: "The Future of Sustainable Fashion",
      excerpt:
        "Discover how FreshOff is leading the charge in eco-friendly luxury accessories with innovative materials and ethical practices.",
      content: "Full blog content here...",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800",
      author: "Alexandra Chen",
      authorImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      date: "2024-01-15",
      category: "Sustainability",
      readTime: "5 min read",
      tags: ["Eco-Friendly", "Innovation", "Future"],
      featured: true,
      gradient: "from-[#39FF14] to-[#00E5FF]",
    },
    {
      id: "2",
      title: "Spring 2024 Collection: Neon Dreams",
      excerpt:
        "Get an exclusive first look at our vibrant spring collection featuring bold colors and futuristic designs.",
      content: "Full blog content here...",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      author: "Marcus Rivera",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      date: "2024-01-10",
      category: "Collections",
      readTime: "4 min read",
      tags: ["New Arrival", "Spring", "Trends"],
      featured: true,
      gradient: "from-[#FF1493] to-[#9D00FF]",
    },
    {
      id: "3",
      title: "How to Style Your FreshOff Bag",
      excerpt:
        "Master the art of accessorizing with our comprehensive style guide for every occasion.",
      content: "Full blog content here...",
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800",
      author: "Priya Sharma",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      date: "2024-01-05",
      category: "Style Guide",
      readTime: "6 min read",
      tags: ["Fashion Tips", "Style", "How-To"],
      featured: false,
      gradient: "from-[#FFD700] to-[#FF6600]",
    },
    {
      id: "4",
      title: "Behind the Scenes: Craftsmanship",
      excerpt:
        "Take a journey into our workshop and see how each FreshOff bag is meticulously crafted.",
      content: "Full blog content here...",
      image:
        "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800",
      author: "Alexandra Chen",
      authorImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      date: "2024-01-03",
      category: "Behind the Scenes",
      readTime: "7 min read",
      tags: ["Craftsmanship", "Quality", "Process"],
      featured: false,
      gradient: "from-[#00E5FF] to-[#00CED1]",
    },
    {
      id: "5",
      title: "Celebrity Spotting: FreshOff on the Red Carpet",
      excerpt:
        "See how A-list celebrities are styling their FreshOff bags at premier events worldwide.",
      content: "Full blog content here...",
      image:
        "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
      author: "Marcus Rivera",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      date: "2023-12-28",
      category: "Celebrity",
      readTime: "3 min read",
      tags: ["Celebrity", "Red Carpet", "Events"],
      featured: false,
      gradient: "from-[#E91E63] to-[#FF1493]",
    },
    {
      id: "6",
      title: "Tech Meets Fashion: Smart Features",
      excerpt:
        "Explore the innovative technology integrated into our latest smart bag collection.",
      content: "Full blog content here...",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      author: "Priya Sharma",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      date: "2023-12-25",
      category: "Technology",
      readTime: "8 min read",
      tags: ["Tech", "Innovation", "Smart"],
      featured: false,
      gradient: "from-[#9D00FF] to-[#8B00FF]",
    },
  ];

  const categories = [
    "all",
    "Sustainability",
    "Collections",
    "Style Guide",
    "Behind the Scenes",
    "Celebrity",
    "Technology",
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#150027]">
      {/* Background Effect */}
      <div className="fixed inset-0 neon-grid opacity-10" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-6xl md:text-7xl font-bold mb-4 text-gradient-neon"
            style={{ fontFamily: "var(--font-family-bebas)" }}
          >
            FRESHOFF BLOG
          </h1>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-family-montserrat)" }}
          >
            Fashion insights, style guides, and the latest news from the world
            of FreshOff
          </p>
        </motion.div>

        {/* Search and Categories */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-modern w-full pl-4 pr-12"
              />
              <FiBookOpen className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#FF1493] to-[#9D00FF] text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-gray-700"
                  }`}
                  style={{ fontFamily: "var(--font-family-space)" }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="text-[#39FF14]" />
              <span className="text-[#39FF14] font-semibold uppercase tracking-wider text-sm">
                Featured Article
              </span>
            </div>
            <div className="card-modern overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-[#39FF14]/10 to-[#00E5FF]/10 text-[#39FF14] rounded-full border border-[#39FF14]/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    className={`text-4xl font-bold mb-4 bg-gradient-to-r ${featuredPost.gradient} bg-clip-text text-transparent`}
                    style={{ fontFamily: "var(--font-family-bebas)" }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-white font-medium">
                        {featuredPost.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <FiCalendar />
                        {new Date(featuredPost.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="btn-neon inline-flex items-center gap-2 self-start"
                  >
                    Read Full Article <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-modern group overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-3 py-1 text-xs bg-gradient-to-r ${post.gradient} text-white rounded-full font-semibold`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gradient-neon transition-all line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-400">{post.author}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 text-[#00E5FF] hover:text-[#39FF14] font-semibold text-sm flex items-center gap-1 transition-colors"
                >
                  Read More <FiArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiBookOpen className="text-6xl text-gray-600 mx-auto mb-4" />
            <p className="text-2xl text-gray-400 mb-2">No articles found</p>
            <p className="text-gray-500">
              Try adjusting your search or category filter
            </p>
          </motion.div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="card-modern p-12 text-center bg-gradient-to-r from-[#FF1493]/10 via-[#9D00FF]/10 to-[#00E5FF]/10">
            <h2
              className="text-4xl font-bold mb-4 text-gradient-gold"
              style={{ fontFamily: "var(--font-family-bebas)" }}
            >
              NEVER MISS AN UPDATE
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive content, style tips, and
              early access to new collections
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-modern flex-1"
              />
              <button className="btn-neon whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </motion.div>

        {/* Popular Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            <FiTag className="text-[#FFD700]" />
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Fashion Trends",
              "Sustainability",
              "New Arrivals",
              "Style Tips",
              "Celebrity Style",
              "Behind the Scenes",
              "Innovation",
              "Luxury",
              "Spring 2024",
            ].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gradient-to-r from-[#150027] to-[#1a0033] border border-gray-700 rounded-full text-gray-300 hover:border-[#FF1493] hover:text-[#FF1493] transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
