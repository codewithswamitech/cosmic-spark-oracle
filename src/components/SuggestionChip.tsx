
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
        "suggestion-chip",
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
