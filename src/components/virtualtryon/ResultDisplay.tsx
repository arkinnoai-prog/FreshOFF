import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, ArrowLeft, Sparkles, Heart } from "lucide-react";

const ResultDisplay = ({
  result,
  model,
  onBackToCanvas,
  onStartOver,
}: {
  result: any;
  model: any;
  onBackToCanvas: () => void;
  onStartOver: () => void;
}) => {
  const [showResult, setShowResult] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (result) {
      if (result.image_base64 && result.content_type) {
        const dataUrl = `data:${result.content_type};base64,${result.image_base64}`;
        setResultImageUrl(dataUrl);
      } else if (result.image_url) {
        setResultImageUrl(result.image_url);
      } else if (typeof result === "string") {
        setResultImageUrl(result);
      }
    }

    setTimeout(() => {
      setShowResult(true);
    }, 1500);
  }, [result]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "virtual-tryon-result.jpg";
    link.href = resultImageUrl;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        if (resultImageUrl.startsWith("data:")) {
          const response = await fetch(resultImageUrl);
          const blob = await response.blob();
          const file = new File([blob], "tryon-result.jpg", {
            type: result.content_type || "image/jpeg",
          });

          await navigator.share({
            title: "My Virtual Try-On",
            text: "Check out my virtual try-on result!",
            files: [file],
          });
        } else {
          await navigator.share({
            title: "My Virtual Try-On",
            text: "Check out my virtual try-on result!",
            url: window.location.href,
          });
        }
      } catch (err) {
        console.log("Share failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-950 p-4">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-purple-600 dark:text-violet-400" />
            </motion.div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 text-center px-4"
            >
              Creating your perfect look...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center mb-6 md:mb-8 px-4"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                Your Virtual Try-On is Ready!
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Here's how amazing you look
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-2 sm:px-4">
              {/* Before Image */}
              <motion.div
                initial={{
                  x: isMobile ? 0 : -50,
                  opacity: 0,
                  y: isMobile ? -20 : 0,
                }}
                animate={{ x: 0, opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-3 md:p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600">
                    <h3 className="text-center font-semibold text-sm md:text-base text-gray-700 dark:text-gray-300">
                      Before
                    </h3>
                  </div>
                  <div className="p-3 md:p-4">
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "133.33%" }}
                    >
                      <img
                        src={model.image_url}
                        alt="Original model"
                        className="absolute inset-0 w-full h-full object-contain bg-gray-50 dark:bg-slate-900 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* After Image */}
              <motion.div
                initial={{
                  x: isMobile ? 0 : 50,
                  opacity: 0,
                  y: isMobile ? 20 : 0,
                }}
                animate={{ x: 0, opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-3 md:p-4 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-violet-500 dark:to-purple-500">
                    <h3 className="text-center font-semibold text-sm md:text-base text-white">
                      After
                    </h3>
                  </div>
                  <div className="p-3 md:p-4">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="relative w-full"
                      style={{ paddingBottom: "133.33%" }}
                    >
                      <img
                        src={resultImageUrl}
                        alt="Try-on result"
                        className="absolute inset-0 w-full h-full object-contain bg-gray-50 dark:bg-slate-900 rounded-lg"
                        onError={(e: any) => {
                          console.error("Error loading result image");
                          e.target.src = model.image_url; // Fallback to original
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Sparkle Effects - Adjusted for mobile */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4"
                >
                  <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-yellow-400" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4"
                >
                  <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-pink-400 dark:text-violet-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* Action Buttons - Responsive Layout */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 md:mt-8 px-2 sm:px-4"
            >
              {/* Primary Actions - Always visible */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-violet-500 dark:to-purple-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all text-sm md:text-base"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
                  Download Result
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 md:py-3 bg-white dark:bg-slate-800 text-purple-600 dark:text-violet-400 border-2 border-purple-600 dark:border-violet-500 rounded-full hover:bg-purple-50 dark:hover:bg-slate-700 transition-all text-sm md:text-base"
                >
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" />
                  Share
                </button>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 md:py-3 rounded-full transition-all text-sm md:text-base ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-violet-900/30"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      isLiked ? "fill-current" : ""
                    }`}
                  />
                  {isLiked ? "Liked!" : "Like"}
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onBackToCanvas}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 md:py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-slate-600 transition-all text-sm md:text-base"
                >
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Try Another Outfit</span>
                  <span className="sm:hidden">Try Another</span>
                </button>

                <button
                  onClick={onStartOver}
                  className="px-4 sm:px-6 py-2.5 md:py-3 text-purple-600 dark:text-violet-400 hover:text-purple-700 dark:hover:text-violet-300 transition-all text-sm md:text-base text-center"
                >
                  <span className="hidden sm:inline">
                    Start Over with New Model
                  </span>
                  <span className="sm:hidden">New Model</span>
                </button>
              </div>
            </motion.div>

            {/* Mobile-optimized floating action button */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="fixed bottom-20 right-4 z-50"
              >
                <button
                  onClick={handleDownload}
                  className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-violet-500 dark:to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center"
                >
                  <Download className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultDisplay;
