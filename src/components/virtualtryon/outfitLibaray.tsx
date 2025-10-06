import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Plus, Star, TrendingUp, Shirt, Package } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { sampleOutfits } from "@/assets/outfit";

interface Outfit {
  id: string | number;
  name: string;
  url: string;
  file?: File;
  category: string;
  isNew?: boolean;
}

interface OutfitLibraryProps {
  onSelectOutfit: (outfit: Outfit) => void;
  onUploadOutfit?: (outfit: Outfit) => void;
}

const OutfitLibrary: React.FC<OutfitLibraryProps> = ({
  onSelectOutfit,
  onUploadOutfit,
}) => {
  const [uploadedOutfits, setUploadedOutfits] = useState<Outfit[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredOutfit, setHoveredOutfit] = useState<string | number | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDrop: (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const newOutfit: Outfit = {
            id: Date.now() + Math.random(),
            name: file.name,
            url: reader.result as string,
            file: file,
            category: "custom",
            isNew: true,
          };
          setUploadedOutfits((prev) => [newOutfit, ...prev]);
          if (onUploadOutfit) {
            onUploadOutfit(newOutfit);
          }
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const allOutfits: Outfit[] = [...uploadedOutfits, ...sampleOutfits];
  const filteredOutfits =
    activeCategory === "all"
      ? allOutfits
      : allOutfits.filter((outfit) => outfit.category === activeCategory);

  const categories = ["all", "custom", "dress", "top", "bottom", "jacket"];

  const categoryIcons: Record<string, string> = {
    dress: "👗",
    top: "👔",
    bottom: "👖",
    jacket: "🧥",
    custom: "✨",
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    outfit: Outfit
  ): void => {
    e.stopPropagation();
    e.dataTransfer.setData("outfit", JSON.stringify(outfit));
    e.dataTransfer.effectAllowed = "copy";

    // Create custom drag preview
    const dragPreview = document.createElement("div");
    dragPreview.className = "drag-preview";
    dragPreview.style.cssText = `
      width: 120px;
      height: 160px;
      border-radius: 12px;
      overflow: hidden;
      position: absolute;
      top: -1000px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      border: 3px solid #7c3aed;
      background: #1e293b;
    `;

    const img = document.createElement("img");
    img.src = outfit.url;
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #1e293b;
    `;

    dragPreview.appendChild(img);
    document.body.appendChild(dragPreview);

    e.dataTransfer.setDragImage(dragPreview, 60, 80);

    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 0);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    setIsScrolled(e.currentTarget.scrollTop > 10);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to br, #0f172a, #1e293b, #160B26)",
      }}
      className="h-full flex flex-col rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header - Fixed */}
      <div
        className={`flex-shrink-0 p-4 bg-gradient-to-r from-slate-800 to-violet-950/30 border-b border-violet-900/30 transition-all duration-200 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-200 flex items-center gap-2">
            <Package className="w-5 h-5 text-violet-400" />
            Wardrobe
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Shirt className="w-4 h-4" />
            <span>{filteredOutfits.length} items</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-md"
                  : "bg-slate-700 hover:bg-slate-600 text-gray-300 border border-violet-900/30"
              }`}
            >
              {categoryIcons[category] && (
                <span className="text-sm">{categoryIcons[category]}</span>
              )}
              {category}
              {category === "custom" && uploadedOutfits.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-[10px]">
                  {uploadedOutfits.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-slate-900 to-slate-800 min-h-0"
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#7c3aed #1e293b",
        }}
      >
        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={`mb-4 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
            isDragActive
              ? "border-violet-500 bg-violet-950/30"
              : "border-violet-900/50 hover:border-violet-500 bg-slate-800/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex items-center justify-center gap-3">
            <div
              className={`p-2 rounded-lg transition-colors ${
                isDragActive ? "bg-violet-900/30" : "bg-slate-700"
              }`}
            >
              <Plus
                className={`w-5 h-5 ${
                  isDragActive ? "text-violet-400" : "text-gray-400"
                }`}
              />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-300">
                {isDragActive ? "Drop your item here" : "Upload Item"}
              </p>
              <p className="text-xs text-gray-500">
                Drag & drop clothing items
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence>
            {filteredOutfits.map((outfit, index) => (
              <motion.div
                key={outfit.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: Math.min(index * 0.02, 0.2) }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectOutfit(outfit)}
                onMouseEnter={() => setHoveredOutfit(outfit.id)}
                onMouseLeave={() => setHoveredOutfit(null)}
                className="relative cursor-pointer group"
                draggable
                onDragStart={(e) =>
                  handleDragStart(
                    e as unknown as React.DragEvent<HTMLDivElement>,
                    outfit
                  )
                }
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl shadow-violet-900/20 transition-all duration-200 border border-violet-900/30">
                  <div className="w-full h-full p-2  flex items-center justify-center">
                    <img
                      src={outfit.url}
                      alt={outfit.name}
                      className="max-w-full max-h-full object-contain pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-medium truncate">
                        {outfit.name}
                      </p>
                      <p className="text-white/80 text-[10px] capitalize mt-0.5">
                        {outfit.category} • Click to try on
                      </p>
                    </div>
                  </div>

                  {/* New Badge */}
                  {outfit.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 left-2"
                    >
                      <div className="px-2 py-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-[10px] font-bold rounded-full shadow-lg">
                        NEW
                      </div>
                    </motion.div>
                  )}

                  {/* Category Icon */}
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700/90 backdrop-blur-sm shadow-md flex items-center justify-center text-sm">
                      {categoryIcons[outfit.category] || "📦"}
                    </div>
                  </div>

                  {/* Drag Indicator */}
                  {hoveredOutfit === outfit.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                      <div className="flex justify-center items-center flex-col bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-xl">
                        <Grid className="w-6 h-6 text-violet-400" />
                        <p className="text-[10px] font-medium text-violet-400 mt-1">
                          Drag to try!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredOutfits.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm font-medium">
              No items in this category
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Upload items or select "all"
            </p>
          </div>
        )}
      </div>

      {/* Footer Stats - Fixed */}
      <div className="flex-shrink-0 p-3 bg-gradient-to-r from-slate-800 to-violet-950/30 border-t border-violet-900/30">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              <span>Featured</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span>Trending</span>
            </div>
          </div>
          <span className="font-medium">{uploadedOutfits.length} uploaded</span>
        </div>
      </div>
    </div>
  );
};

export default OutfitLibrary;
