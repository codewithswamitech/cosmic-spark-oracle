
import React, { useEffect } from "react";
import { useChat } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

const ChatContainer = () => {
  const { messages, chatContainerRef } = useChat();

  // Add a welcome message when the component mounts
  useEffect(() => {
    // Only show welcome message if no messages exist
    if (messages.length === 0) {
      const welcomeMessage = {
        id: "welcome",
        type: "astro" as const,
        text: "Welcome to AskAstro! I'm your personal cosmic guide. Ask me about your horoscope, relationships, career, or anything else the stars might reveal! ✨",
        timestamp: new Date(),
      };
      
      // We're accessing the DOM ref directly for this initial scroll
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
      
      return () => {}; // No cleanup needed
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
    >
      {/* Welcome message if no messages */}
      {messages.length === 0 && (
        <MessageBubble
          message={{
            id: "welcome",
            type: "astro",
            text: "Welcome to AskAstro! I'm your personal cosmic guide. Ask me about your horoscope, relationships, career, or anything else the stars might reveal! ✨",
            timestamp: new Date(),
          }}
        />
      )}

      {/* Render all messages */}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatContainer;
