
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ChatContainer from "@/components/ChatContainer";
import InputArea from "@/components/InputArea";
import SignupModal from "@/components/SignupModal";
import BirthInfoModal from "@/components/BirthInfoModal";
import CosmicBackground from "@/components/CosmicBackground";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider, useChat } from "@/context/ChatContext";
import { BirthData } from "@/components/BirthInfoModal";

const ChatPage = () => {
  const { questionCount, showBirthModal, setShowBirthModal, setBirthData } = useChat();
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    // When user has asked 3 questions, show the signup modal
    if (questionCount >= 3 && !showSignupModal) {
      setShowSignupModal(true);
    }
  }, [questionCount, showSignupModal]);

  const handleBirthDataSubmit = (data: BirthData) => {
    setBirthData(data);
    setShowBirthModal(false);
    // In a real app, you would send this data to your backend
    console.log("Birth data submitted:", data);
  };

  return (
    <>
      <CosmicBackground />
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto overflow-hidden">
          <ChatContainer />
          <InputArea />
        </main>
      </div>
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
      <BirthInfoModal 
        isOpen={showBirthModal} 
        onClose={() => setShowBirthModal(false)}
        onSubmit={handleBirthDataSubmit}
      />
    </>
  );
};

// Wrapper component to provide context
const Index = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <ChatPage />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default Index;
