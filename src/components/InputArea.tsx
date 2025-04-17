
import React, { useState } from "react";
import { Send } from "lucide-react";
import { useChat } from "../context/ChatContext";
import SuggestionChip from "./SuggestionChip";

const InputArea = () => {
  const [message, setMessage] = useState("");
  const { sendUserMessage } = useChat();
  
  const suggestions = [
    "Love today?",
    "Career boost?",
    "My mood?",
    "Weekly horoscope?",
    "Future plans?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendUserMessage(message.trim());
      setMessage("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendUserMessage(suggestion);
  };

  return (
    <div className="border-t border-border/30 bg-black/30 backdrop-blur-sm p-4 pb-6">
      {/* Suggestions */}
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion, index) => (
          <SuggestionChip
            key={suggestion}
            text={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            delay={index * 100} // Staggered animation
          />
        ))}
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask the stars..."
          className="cosmic-input w-full py-3.5 pl-5 pr-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(155,135,245,0.3)] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          autoFocus
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Send size={18} className="group-hover:animate-pulse" />
          <span className="sr-only">Send message</span>
        </button>
      </form>
    </div>
  );
};

export default InputArea;
