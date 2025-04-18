
import React, { useEffect, useState } from "react";
import DashboardComponent from "@/components/Dashboard";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider, useChat } from "@/context/ChatContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BirthInfoModal from "@/components/BirthInfoModal";
import ChatContainer from "@/components/ChatContainer";
import InputArea from "@/components/InputArea";

const DashboardContent = () => {
  const navigate = useNavigate();
  const { birthData, setBirthData, setShowBirthModal, showBirthModal, showChat, setShowChat } = useChat();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Please login to access the dashboard");
      navigate("/");
    }
  }, [navigate]);

  const handleBirthDataSubmit = (data: any) => {
    setBirthData(data);
    setShowBirthModal(false);
    toast.success("Profile information updated!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <Button onClick={handleLogout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
      {showChat ? (
        <div className="flex flex-col h-screen">
          <div className="absolute top-4 left-4 z-50">
            <Button 
              onClick={() => setShowChat(false)} 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-1"
            >
              ← Back to Dashboard
            </Button>
          </div>
          <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto overflow-hidden pt-14">
            <ChatContainer />
            <InputArea />
          </main>
        </div>
      ) : (
        <DashboardComponent />
      )}
      <BirthInfoModal 
        isOpen={showBirthModal} 
        onClose={() => setShowBirthModal(false)}
        onSubmit={handleBirthDataSubmit}
      />
    </>
  );
};

const DashboardPage = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <DashboardContent />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default DashboardPage;
