import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import ModelSelector from "@/components/virtualtryon/ModelSelector";
import TryOnCanvas from "@/components/virtualtryon/TryOnCanvas";
import ResultDisplay from "@/components/virtualtryon/ResultDisplay";

const queryClient = new QueryClient();

function VirtualTryOn() {
  const [currentStep, setCurrentStep] = useState("model-selection");
  const [selectedModel, setSelectedModel] = useState(null);
  const [tryOnResult, setTryOnResult] = useState(null);

  const handleModelSelect = (model: any) => {
    setSelectedModel(model);
    setCurrentStep("canvas");
  };

  //   const handleTryOnComplete = (result: any) => {
  //     setTryOnResult(result);
  //     setCurrentStep("result");
  //   };

  const handleBackToCanvas = () => {
    setCurrentStep("canvas");
    setTryOnResult(null);
  };

  const handleStartOver = () => {
    setCurrentStep("model-selection");
    setSelectedModel(null);
    setTryOnResult(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:dark-gradient-main">
        <AnimatePresence mode="wait">
          {currentStep === "model-selection" && (
            <ModelSelector
              key="model-selector"
              onSelectModel={handleModelSelect}
            />
          )}

          {currentStep === "canvas" && selectedModel && (
            <TryOnCanvas
              key="canvas"
              model={selectedModel}
              onBack={handleStartOver}
            />
          )}

          {currentStep === "result" && tryOnResult && (
            <ResultDisplay
              key="result"
              result={tryOnResult}
              model={selectedModel}
              onBackToCanvas={handleBackToCanvas}
              onStartOver={handleStartOver}
            />
          )}
        </AnimatePresence>
      </div>
    </QueryClientProvider>
  );
}

export default VirtualTryOn;
