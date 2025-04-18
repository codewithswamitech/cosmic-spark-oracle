import React, { createContext, useContext, useState, ReactNode, useRef } from "react";

// Define Message interface for chat messages
export interface ChatMessage {
  id: string;
  type: "user" | "astro";
  text: string;
  timestamp: Date;
}

interface BirthData {
  firstName: string;
  birthDate: Date | null;
  // Additional profile fields
  birthTime?: string;
  birthPlace?: string;
  partnerName?: string;
  houseNumber?: string;
  mobileNumber?: string;
  alternateNumber?: string;
  vehicleNumber?: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  birthData: BirthData | null;
  setBirthData: (data: BirthData) => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  questionCount: number;
  resetQuestionCount: () => void;
  sendUserMessage: (message: string) => void;
  showBirthModal: boolean;
  setShowBirthModal: (show: boolean) => void;
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
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [showBirthModal, setShowBirthModal] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Check if we have stored data
  React.useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Convert date string back to Date object if it exists
        if (parsedData.birthDate) {
          parsedData.birthDate = new Date(parsedData.birthDate);
        }
        setBirthDataState(prev => ({
          ...prev,
          ...parsedData
        }));
      } catch (error) {
        console.error("Error parsing profile data from localStorage:", error);
      }
    }
  }, []);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const setBirthData = (data: BirthData) => {
    // Store in localStorage, ensuring we handle Date objects
    const dataToStore = {
      ...data,
      // Convert Date to ISO string for storage
      birthDate: data.birthDate ? data.birthDate.toISOString() : null
    };
    
    localStorage.setItem("profileData", JSON.stringify(dataToStore));
    setBirthDataState(data);
  };
  
  const resetQuestionCount = () => {
    setQuestionCount(0);
  };
  
  const sendUserMessage = (messageText: string) => {
    // Create a unique ID for the message
    const messageId = `msg_${Date.now()}`;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: messageId,
      type: "user",
      text: messageText,
      timestamp: new Date()
    };
    
    addMessage(userMessage);
    
    // Increment question count
    setQuestionCount(prev => prev + 1);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      // Create response message
      const responseMessage: ChatMessage = {
        id: `resp_${Date.now()}`,
        type: "astro",
        text: getAstroResponse(messageText),
        timestamp: new Date()
      };
      
      addMessage(responseMessage);
      
      // Scroll to bottom
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 1000);
  };
  
  // Simple response generator (placeholder)
  const getAstroResponse = (message: string) => {
    const responses = [
      "The stars show a positive path forward. Keep your intentions clear and focused.",
      "Mercury's position suggests you should reconsider that decision. Take your time.",
      "Venus is smiling on your relationships now. It's a good time to connect with loved ones.",
      "The cosmic energies are aligned with your goals. This is an excellent time to move forward.",
      "I sense some uncertainty in your cosmic field. Take time to meditate and find clarity.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        birthData,
        setBirthData,
        chatContainerRef,
        questionCount,
        resetQuestionCount,
        sendUserMessage,
        showBirthModal,
        setShowBirthModal,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
