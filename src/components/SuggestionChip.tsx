
import React from "react";
import { cn } from "@/lib/utils";

interface SuggestionChipProps {
  text: string;
  onClick: () => void;
  delay?: number;
}

const SuggestionChip = ({ text, onClick, delay = 0 }: SuggestionChipProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white/90 text-sm font-medium transition-all hover:border-purple-400/50 hover:text-white hover:shadow-[0_0_10px_rgba(155,135,245,0.4)] active:scale-95",
        delay > 0 ? "opacity-0" : "opacity-100"
      )}
      onClick={onClick}
      style={{
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`,
        animation: delay > 0 ? "message-fade-in 0.3s ease-out forwards" : undefined,
      }}
    >
      {text}
    </button>
  );
};

export default SuggestionChip;
