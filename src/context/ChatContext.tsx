
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

type MessageType = "user" | "astro";

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (text: string, type: MessageType) => void;
  questionCount: number;
  resetQuestionCount: () => void;
  sendUserMessage: (text: string) => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Mock responses from Astro - in a real app, these would come from an API
const astroResponses = [
  "The stars suggest this is a powerful time for self-reflection. Your cosmic energy is aligned with Jupiter, bringing opportunities for personal growth.",
  "Your chart shows a strong Venus influence today! Expect harmony in relationships and possibly a romantic encounter under tonight's moon.",
  "Mercury's retrograde is affecting your communication. Take extra time to clarify your thoughts before important conversations.",
  "The cosmic alignment suggests this is an ideal time for career advancement. The stars favor bold moves professionally!",
  "I sense emotional turbulence in your cosmic field. This is temporary - Saturn's influence will bring stability by month's end.",
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Add a message to the chat
  const addMessage = (text: string, type: MessageType) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    if (type === "user") {
      setQuestionCount(prev => prev + 1);
    }
  };

  // Reset the question counter
  const resetQuestionCount = () => setQuestionCount(0);

  // Send a user message and get a response
  const sendUserMessage = (text: string) => {
    addMessage(text, "user");
    
    // Simulate typing delay
    setTimeout(() => {
      const randomResponse = astroResponses[Math.floor(Math.random() * astroResponses.length)];
      addMessage(randomResponse, "astro");
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      const element = chatContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContext.Provider value={{
      messages,
      addMessage,
      questionCount,
      resetQuestionCount,
      sendUserMessage,
      chatContainerRef
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  
  return context;
}
