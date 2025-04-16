
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ChatContainer from "@/components/ChatContainer";
import InputArea from "@/components/InputArea";
import SignupModal from "@/components/SignupModal";
import CosmicBackground from "@/components/CosmicBackground";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider, useChat } from "@/context/ChatContext";

const ChatPage = () => {
  const { questionCount } = useChat();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // When user has asked 3 questions, show the modal
    if (questionCount >= 3 && !showModal) {
      setShowModal(true);
    }
  }, [questionCount, showModal]);

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
      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
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
