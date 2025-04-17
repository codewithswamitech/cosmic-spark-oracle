
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { BirthData } from "@/components/BirthInfoModal";

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
  showBirthModal: boolean;
  setShowBirthModal: (show: boolean) => void;
  birthData: BirthData | null;
  setBirthData: (data: BirthData) => void;
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

// Keywords that might trigger birth info modal
const personalInsightKeywords = [
  "love", "career", "mood", "relationship", "job", "future", "personality", "sign", 
  "horoscope", "zodiac", "fortune", "prediction"
];

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [showBirthModal, setShowBirthModal] = useState(false);
  const [birthData, setBirthData] = useState<BirthData | null>(() => {
    // Check if we already have birth data stored
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("askAstroBirthData");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
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

  // Check if message contains personal insight keywords
  const containsPersonalInsightKeyword = (text: string): boolean => {
    return personalInsightKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  // Send a user message and get a response
  const sendUserMessage = (text: string) => {
    addMessage(text, "user");
    
    // Check if we should show birth modal
    // Show after second question if the question implies personal insight
    if (questionCount >= 1 && !birthData && containsPersonalInsightKeyword(text)) {
      setShowBirthModal(true);
    }
    
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
      chatContainerRef,
      showBirthModal,
      setShowBirthModal,
      birthData,
      setBirthData
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
