
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { useTheme } from "@/context/ThemeContext";

type InsightCardType = "mood" | "love" | "career";

interface InsightCardProps {
  type: InsightCardType;
  userName: string;
  insight: string;
  tagline?: string;
  onShare?: () => void;
}

const InsightCard = ({ 
  type, 
  userName, 
  insight, 
  tagline = "",
  onShare 
}: InsightCardProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const cardTitle = {
    mood: "Your Mood Today",
    love: "Your Love Signal",
    career: "Career Signal for You",
  };

  const cardEmoji = {
    mood: "✨",
    love: "❤️",
    career: "📈",
  };

  const cardGradient = {
    mood: "from-purple-600 via-blue-500 to-indigo-400",
    love: "from-pink-500 via-purple-500 to-indigo-500",
    career: "from-blue-600 via-blue-400 to-cyan-400",
  };

  const handleExportCard = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsExporting(true);
      
      // Remove share buttons during capture
      const shareButtons = cardRef.current.querySelector(".share-buttons");
      if (shareButtons) {
        shareButtons.classList.add("hidden");
      }
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
      });
      
      // Show share buttons again
      if (shareButtons) {
        shareButtons.classList.remove("hidden");
      }
      
      const imageUrl = canvas.toDataURL("image/png");
      
      // Create a link to download the image
      const link = document.createElement("a");
      link.download = `askastro-${type}-insight.png`;
      link.href = imageUrl;
      link.click();
      
    } catch (error) {
      console.error("Error exporting card:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareCard = () => {
    // In a real app, this would open share dialog with proper social integrations
    if (onShare) {
      onShare();
    } else {
      // Fallback to native sharing if available
      if (navigator.share) {
        handleExportCard().then(() => {
          navigator.share({
            title: `Your AskAstro ${type} insight`,
            text: `${userName}, here's your ${type} insight: ${insight}`,
            url: "https://askastro.me", // Replace with your actual URL
          }).catch(err => console.error("Error sharing:", err));
        });
      } else {
        // Just export if sharing not available
        handleExportCard();
      }
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto my-8">
      {/* Card Container - Instagram Post Size Ratio 1080x1350 (4:5) */}
      <div 
        ref={cardRef}
        className={`w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br ${cardGradient[type]} relative p-6 shadow-lg flex flex-col`}
      >
        {/* Star overlay */}
        <div className="absolute inset-0 bg-[url('/stars-overlay.png')] opacity-30 mix-blend-screen"></div>
        
        {/* Card Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="text-xl font-bold text-white mb-2">
              {cardTitle[type]} {cardEmoji[type]}
            </div>
            <div className="text-white/80 text-sm">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h2 className="text-lg sm:text-xl text-white mb-4">
              {userName}, here's your cosmic vibe ✨
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-white shadow-sm px-4 py-6 border border-white/20 rounded-2xl bg-white/10 backdrop-blur-sm">
              {insight}
            </p>
            
            {tagline && (
              <div className="mt-6 text-sm text-white/90 font-medium">
                {tagline}
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="mt-auto pt-4 text-center">
            <div className="text-sm text-white/80 font-medium">
              AskAstro.me
            </div>
            <div className="text-xs text-white/70 mt-1">
              Want yours? Try now 🌌
            </div>
          </div>
        </div>
      </div>
      
      {/* Share buttons - these will be hidden during export */}
      <div className="share-buttons flex gap-3 mt-4">
        <Button 
          onClick={handleShareCard} 
          className="flex items-center gap-2"
          disabled={isExporting}
        >
          <Share2 size={16} />
          Share
        </Button>
        <Button
          onClick={handleExportCard}
          variant="outline"
          className="flex items-center gap-2"
          disabled={isExporting}
        >
          <Download size={16} />
          Download
        </Button>
      </div>
    </div>
  );
};

export default InsightCard;
