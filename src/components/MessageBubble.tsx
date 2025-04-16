
import React from "react";
import { Message } from "../context/ChatContext";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.type === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "mb-4 flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          isUser ? "message-bubble-user" : "message-bubble-astro",
          isUser ? "ml-auto" : "mr-auto"
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            {!isUser && (
              <span className="font-medium text-sm">🔮 Astro</span>
            )}
            {isUser && (
              <span className="font-medium text-sm ml-auto">You</span>
            )}
          </div>
          <p className="text-sm sm:text-base">{message.text}</p>
          <span className="text-xs opacity-70 mt-1 ml-auto">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
