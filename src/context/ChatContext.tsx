
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BirthData {
  firstName: string;
  birthDate: string;
  // Additional profile fields
  birthTime?: string;
  birthPlace?: string;
  partnerName?: string;
  houseNumber?: string;
  mobileNumber?: string;
  alternateNumber?: string;
  vehicleNumber?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  birthData: BirthData | null;
  setBirthData: (data: BirthData) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [birthData, setBirthDataState] = useState<BirthData | null>(null);

  // Check if we have stored data
  React.useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setBirthDataState(prev => ({
        ...prev,
        ...parsedData
      }));
    }
  }, []);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const setBirthData = (data: BirthData) => {
    setBirthDataState(data);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        birthData,
        setBirthData,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
