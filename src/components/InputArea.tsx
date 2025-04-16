
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
    <div className="border-t border-border bg-card p-4">
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
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask the stars..."
          className="cosmic-input w-full py-3 pl-4 pr-12 focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} className="hover:animate-pulse" />
          <span className="sr-only">Send message</span>
        </button>
      </form>
    </div>
  );
};

export default InputArea;
