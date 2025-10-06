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
    },
    {
      id: "2",
      title: "Spring 2024 Collection: Timeless Elegance",
      excerpt:
        "Get an exclusive first look at our sophisticated spring collection featuring classic designs with modern touches.",
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

        {/* Subtle glass reflection */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 45deg at 30% 30%, 
              transparent 0deg, 
              rgba(255,255,255,0.02) 45deg, 
              transparent 90deg,
              transparent 180deg,
              rgba(255,255,255,0.01) 270deg,
              transparent 360deg)`,
            animation: "rotateShine 30s linear infinite",
          }}
        />
      </div>

      <div className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1
              className="text-6xl md:text-7xl font-light mb-4 text-white"
              style={{
                fontFamily:
                  "var(--font-family-playfair), 'Cormorant Garamond', serif",
                letterSpacing: "0.01em",
              }}
            >
              FreshOff Journal
            </h1>
            <p
              className="text-lg text-white/60 max-w-2xl mx-auto"
              style={{
                fontFamily:
                  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
              }}
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
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none glass-effect-dark"
                />
                <FiBookOpen className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all text-sm tracking-wider ${
                      selectedCategory === category
                        ? "bg-[#957E5B] text-white"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                    style={{
                      fontFamily:
                        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                    }}
                  >
                    {category.toUpperCase()}
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
                <FiTrendingUp className="text-[#957E5B]" />
                <span className="text-[#957E5B] font-semibold uppercase tracking-wider text-sm">
                  Featured Article
                </span>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden group glass-effect-dark">
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
                          className="px-3 py-1 text-xs bg-[#957E5B]/20 text-[#957E5B] rounded-full border border-[#957E5B]/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h2
                      className="text-4xl font-light mb-4 text-white"
                      style={{
                        fontFamily:
                          "var(--font-family-playfair), 'Cormorant Garamond', serif",
                      }}
                    >
                      {featuredPost.title}
                    </h2>
                    <p
                      className="text-white/60 mb-6 text-base"
                      style={{
                        fontFamily:
                          "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                        lineHeight: "1.6",
                      }}
                    >
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
                      <div className="flex items-center gap-4 text-white/40 text-sm">
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
                      className="inline-flex items-center gap-2 self-start px-6 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider"
                    >
                      READ FULL ARTICLE <FiArrowRight />
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
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg group overflow-hidden hover:scale-105 transition-transform glass-effect-dark"
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
                    <span className="px-3 py-1 text-xs bg-[#957E5B]/20 text-[#957E5B] rounded-full font-semibold border border-[#957E5B]/30">
                      {post.category}
                    </span>
                    <span className="text-xs text-white/40">
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-light mb-3 text-white line-clamp-2"
                    style={{
                      fontFamily:
                        "var(--font-family-playfair), 'Cormorant Garamond', serif",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-white/50 mb-4 line-clamp-3 text-sm"
                    style={{
                      fontFamily:
                        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                      lineHeight: "1.6",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-white/40">
                        {post.author}
                      </span>
                    </div>
                    <span className="text-xs text-white/30">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="mt-4 text-[#957E5B] hover:text-[#b09673] font-medium text-sm flex items-center gap-1 transition-colors"
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
              <FiBookOpen className="text-6xl text-white/20 mx-auto mb-4" />
              <p
                className="text-2xl text-white/40 mb-2"
                style={{
                  fontFamily:
                    "var(--font-family-playfair), 'Cormorant Garamond', serif",
                }}
              >
                No articles found
              </p>
              <p className="text-white/30">
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
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-12 text-center glass-effect-dark">
              <h2
                className="text-4xl font-light mb-4 text-white"
                style={{
                  fontFamily:
                    "var(--font-family-playfair), 'Cormorant Garamond', serif",
                }}
              >
                Never Miss An Update
              </h2>
              <p
                className="text-lg text-white/60 mb-8 max-w-2xl mx-auto"
                style={{
                  fontFamily:
                    "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
                }}
              >
                Subscribe to our newsletter for exclusive content, style tips,
                and early access to new collections
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:border-[#957E5B]/50 focus:outline-none"
                />
                <button className="px-8 py-3 bg-[#957E5B] text-white rounded-full hover:bg-[#7a6649] transition-colors text-sm tracking-wider whitespace-nowrap">
                  SUBSCRIBE
                </button>
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
            <h3
              className="text-2xl font-light mb-6 text-white flex items-center gap-2"
              style={{
                fontFamily:
                  "var(--font-family-playfair), 'Cormorant Garamond', serif",
              }}
            >
              <FiTag className="text-[#957E5B]" />
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
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 hover:border-[#957E5B]/50 hover:text-[#957E5B] transition-all text-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
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

        @keyframes lightStreak {
          0% {
            transform: translateX(-150%) translateY(-150%) rotate(45deg);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          50% {
            transform: translateX(0%) translateY(0%) rotate(45deg);
            opacity: 0.5;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(150%) translateY(150%) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes rotateShine {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
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

export default BlogPage;
