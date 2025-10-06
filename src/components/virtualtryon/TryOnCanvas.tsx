import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wand2,
  Download,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  ScanLine,
  Eye,
} from "lucide-react";
import { modelsApi } from "@/services/api";
import OutfitLibrary from "./outfitLibaray";

interface Model {
  id: number;
  image_url: string;
}

interface Outfit {
  id?: string | number;
  name: string;
  category?: string;
  url?: string;
  file?: File;
}

interface TryOnCanvasProps {
  model: Model;

  onBack: () => void;
}

const TryOnCanvas: React.FC<TryOnCanvasProps> = ({ model, onBack }) => {
  const canvasRef = useRef<any>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  //   const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [pendingOutfit, setPendingOutfit] = useState<Outfit | null>(null);
  const [scanPosition, setScanPosition] = useState<number>(50);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (!showResult && canvasRef.current) {
      cleanup = initializeCanvas();
    }

    return () => {
      // Properly dispose of the canvas on cleanup
      if (cleanup) {
        cleanup();
      }
    };
  }, [model, showResult]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const initializeCanvas = (): (() => void) => {
    // Dispose of any existing canvas first
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    const canvasContainer = document.getElementById("canvas-container");
    if (!canvasContainer || !canvasRef.current) {
      return () => {};
    }

    const containerWidth = canvasContainer.offsetWidth - 48;
    const aspectRatio = 3 / 4;
    const canvasHeight = containerWidth * aspectRatio;
    const canvasWidth = containerWidth;

    // Check if canvas element already has a fabric instance
    const existingCanvas = (canvasRef.current as any).__canvas;
    if (existingCanvas) {
      existingCanvas.dispose();
    }

    console.log(selectedOutfit, "selectedOutfit");

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#160B26",
    });

    fabricCanvasRef.current = canvas;

    // Load model image
    fabric.Image.fromURL(model.image_url)
      .then((img) => {
        // Check if canvas still exists (component might have unmounted)
        if (!fabricCanvasRef.current) return;

        const scale = Math.min(
          (canvasWidth * 0.9) / (img.width || 1),
          (canvasHeight * 0.9) / (img.height || 1)
        );

        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: "center",
          originY: "center",
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          evented: false,
        });

        fabricCanvasRef.current.add(img);
        fabricCanvasRef.current.renderAll();
      })
      .catch((error) => {
        console.error("Error loading model image:", error);
      });

    // Return cleanup function
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  };

  const prepareImageFile = async (outfit: Outfit): Promise<File> => {
    try {
      if (outfit.file instanceof File) {
        return outfit.file;
      }

      if (outfit.url) {
        const response = await fetch(outfit.url);
        const blob = await response.blob();
        const fileName = outfit.name || `outfit_${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: "image/jpeg" });
        return file;
      }

      throw new Error("No valid image source found");
    } catch (error) {
      console.error("Error preparing image file:", error);
      throw error;
    }
  };

  const confirmAndApply = (outfit: Outfit): void => {
    setPendingOutfit(outfit);
    setShowConfirmDialog(true);
  };

  const handleConfirmApply = async (): Promise<void> => {
    setShowConfirmDialog(false);
    if (pendingOutfit) {
      await handleApply(pendingOutfit);
      setPendingOutfit(null);
    }
  };

  const handleCancelApply = (): void => {
    setShowConfirmDialog(false);
    setPendingOutfit(null);
  };

  const handleApply = async (outfit: Outfit): Promise<void> => {
    if (!outfit) return;

    setIsProcessing(true);
    setSelectedOutfit(outfit);

    try {
      const imageFile = await prepareImageFile(outfit);
      const formData = new FormData();
      formData.append("model_id", model.id.toString());
      formData.append("clothing_image", imageFile);

      const result = await modelsApi.tryOnOutfit(formData);

      // Show result in same canvas area
      const imageUrl = result.image_base64
        ? `data:${result.content_type};base64,${result.image_base64}`
        : result.image_url || result;

      setResultImage(imageUrl);
      setShowResult(true);
      setScanPosition(50); // Reset scan position
    } catch (error) {
      console.error("Try-on failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToEdit = (): void => {
    setShowResult(false);
    setResultImage(null);
    setSelectedOutfit(null);
    setScanPosition(50);
    setIsScanning(false);
  };

  const handleDownload = (): void => {
    if (resultImage) {
      const link = document.createElement("a");
      link.download = "virtual-tryon-result.jpg";
      link.href = resultImage;
      link.click();
    }
  };

  //   const handleShare = async (): Promise<void> => {
  //     if (navigator.share && resultImage) {
  //       try {
  //         await navigator.share({
  //           title: "My Virtual Try-On",
  //           text: "Check out my virtual try-on result!",
  //           url: window.location.href,
  //         });
  //       } catch (err) {
  //         console.log("Share failed:", err);
  //       }
  //     }
  //   };

  const handleOutfitSelect = (outfit: Outfit): void => {
    confirmAndApply(outfit);
  };

  const handleCanvasDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);

    try {
      const outfitData = e.dataTransfer.getData("outfit");
      if (outfitData) {
        const outfit = JSON.parse(outfitData);
        confirmAndApply(outfit);
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const modelTop = rect.height * 0.3;

    // Only allow drop if not over model area
    if (y > modelTop) {
      e.dataTransfer.dropEffect = "copy";
      setIsDragging(true);
    } else {
      e.dataTransfer.dropEffect = "none";
      setIsDragging(false);
    }
  };

  // Handle scanning interaction
  const handleScannerMouseDown = (): void => {
    setIsScanning(true);
  };

  const handleScannerMouseMove = (e: MouseEvent): void => {
    if (!isScanning || !scannerRef.current) return;

    const rect = scannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setScanPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleScannerMouseUp = (): void => {
    setIsScanning(false);
  };

  useEffect(() => {
    if (isScanning) {
      const handleMove = (e: MouseEvent) => handleScannerMouseMove(e);
      const handleUp = () => handleScannerMouseUp();

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);
      };
    }
  }, [isScanning]);

  return (
    <div className="h-screen flex flex-col bg-[#150027] overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=" bg-[#150027] backdrop-blur-md border-b border-violet-900/30 flex-shrink-0 z-20 mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-300" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Virtual Fitting Room
                  </h1>
                  <p className="text-xs text-gray-400">Model #{model.id}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showResult && (
                <>
                  <button
                    onClick={handleBackToEdit}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Edit Again
                  </button>
                  <button
                    onClick={onBack}
                    className="px-4 py-2 text-sm font-medium text-gray-200 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Change Model
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-6 py-6">
          <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-2 h-full overflow-auto">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                style={{
                  background:
                    "linear-gradient(135deg, #0F0A1F, #160B26, #1A0B30)",
                }}
                className=" backdrop-blur-md border border-violet-900/30 rounded-2xl shadow-xl overflow-hidden h-fit"
                id="canvas-container"
              >
                {!showResult ? (
                  <>
                    <div
                      style={{
                        background:
                          "linear-gradient(to bottom, #0D0619, #160B26, #1F1333)",
                      }}
                      className="p-6  border-b border-violet-900/30"
                    >
                      <div className="flex items-center justify-center">
                        <h3 className="font-semibold text-gray-200">
                          Drag & Drop to Try On
                        </h3>
                      </div>
                    </div>

                    <div
                      className="relative bg-gradient-to-b from-slate-800 to-slate-900 p-6"
                      onDragOver={handleDragOver}
                      onDragEnter={(e) => e.preventDefault()}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        if (
                          !e.currentTarget.contains(e.relatedTarget as Node)
                        ) {
                          setIsDragging(false);
                        }
                      }}
                      onDrop={handleCanvasDrop}
                    >
                      <canvas
                        ref={canvasRef}
                        className="mx-auto rounded-lg shadow-inner shadow-violet-900/20"
                      />

                      <AnimatePresence>
                        {isDragging && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-6 pointer-events-none"
                          >
                            <div className="h-full border-4 border-dashed border-violet-400 rounded-xl bg-violet-900/30 flex items-center justify-center">
                              <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-center bg-slate-800 p-6 rounded-2xl shadow-xl"
                              >
                                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <Wand2 className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                  Release to Try On!
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                  AI will process automatically
                                </p>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {isProcessing && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center z-10"
                          >
                            <div className="text-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="inline-block mb-4"
                              >
                                <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                                  <Sparkles className="w-10 h-10 text-white" />
                                </div>
                              </motion.div>
                              <p className="text-xl font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Creating Your Look
                              </p>
                              <p className="text-gray-400 text-sm mt-2">
                                AI is processing your try-on...
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6"
                  >
                    <div className="mb-4 text-center">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        Your Virtual Try-On Result
                      </h3>
                      <p className="text-gray-400 flex items-center justify-center gap-2">
                        <ScanLine className="w-4 h-4" />
                        Drag to compare before & after
                      </p>
                    </div>

                    <div
                      ref={scannerRef}
                      className="relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 p-4 cursor-ew-resize"
                      onMouseDown={handleScannerMouseDown}
                    >
                      <div
                        className="relative rounded-lg overflow-hidden"
                        style={{ userSelect: "none" }}
                      >
                        {/* Original Image (Before) */}
                        <img
                          src={model.image_url}
                          alt="Original"
                          className="w-full h-auto rounded-lg"
                          draggable={false}
                        />

                        {/* Result Image (After) - Clipped */}
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{
                            clipPath: `inset(0 ${100 - scanPosition}% 0 0)`,
                          }}
                        >
                          <img
                            src={resultImage!}
                            alt="Try-on result"
                            className="w-full h-auto rounded-lg"
                            draggable={false}
                          />
                        </div>

                        {/* Scanner Line */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-violet-500 to-purple-500 shadow-xl"
                          style={{
                            left: `${scanPosition}%`,
                            transform: "translateX(-50%)",
                          }}
                        >
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="w-10 h-10 bg-slate-800 rounded-full shadow-lg border-2 border-violet-500 flex items-center justify-center"
                            >
                              <Eye className="w-5 h-5 text-violet-400" />
                            </motion.div>
                          </div>

                          {/* Labels */}
                          <div className="absolute -left-12 top-4 bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-300 shadow-md">
                            Before
                          </div>
                          <div className="absolute -right-10 top-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                            After
                          </div>
                        </div>
                      </div>

                      {/* Percentage Indicator */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
                        {Math.round(scanPosition)}% New Look
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>

                      <button
                        onClick={handleBackToEdit}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 text-gray-300 rounded-xl hover:bg-slate-600 transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Try Another
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Outfit Library - Fixed Height */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 h-full min-h-0"
            >
              <OutfitLibrary
                onSelectOutfit={handleOutfitSelect}
                onUploadOutfit={handleOutfitSelect}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCancelApply}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">
                  Ready to Try On?
                </h3>
                <p className="text-gray-400">
                  AI will process this outfit on your selected model
                </p>
              </div>

              {pendingOutfit && (
                <div className="mb-6 p-3 bg-slate-700 rounded-xl flex items-center gap-3">
                  <img
                    src={pendingOutfit.url}
                    alt={pendingOutfit.name}
                    className="w-16 h-20 object-contain bg-slate-600 rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-200 text-sm">
                      {pendingOutfit.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {pendingOutfit.category || "Custom"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleCancelApply}
                  className="flex-1 px-4 py-2.5 bg-slate-700 text-gray-300 rounded-xl hover:bg-slate-600 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmApply}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Apply Try-On
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TryOnCanvas;
