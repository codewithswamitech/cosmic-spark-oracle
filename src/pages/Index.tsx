
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import ChatContainer from "@/components/ChatContainer";
import InputArea from "@/components/InputArea";
import SignupModal from "@/components/SignupModal";
import BirthInfoModal from "@/components/BirthInfoModal";
import CosmicBackground from "@/components/CosmicBackground";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider, useChat } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ChatPage = () => {
  const { questionCount, showBirthModal, setShowBirthModal, setBirthData } = useChat();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    // When user has asked 3 questions, show the signup modal
    if (questionCount >= 3 && !showSignupModal && localStorage.getItem("isLoggedIn") !== "true") {
      setShowSignupModal(true);
    }
  }, [questionCount, showSignupModal]);

  const handleBirthDataSubmit = (data: any) => {
    setBirthData(data);
    setShowBirthModal(false);
    // In a real app, you would send this data to your backend
    console.log("Birth data submitted:", data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login (NOT FOR PRODUCTION)
    if (email === "admin@gmail.com" && password === "Omkar@123") {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  const headerContent = !showLoginForm ? (
    <Button 
      variant="outline" 
      onClick={() => setShowLoginForm(true)}
      className="ml-auto"
    >
      Sign In
    </Button>
  ) : (
    <form onSubmit={handleLogin} className="ml-auto flex items-center gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded px-3 py-1 bg-background border border-input text-sm"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded px-3 py-1 bg-background border border-input text-sm"
        required
      />
      <Button type="submit" size="sm" variant="secondary">Login</Button>
      <Button 
        type="button" 
        size="sm" 
        variant="ghost" 
        onClick={() => setShowLoginForm(false)}
      >
        Cancel
      </Button>
    </form>
  );

  return (
    <>
      <CosmicBackground />
      <div className="flex flex-col h-screen">
        <Header />
        <div className="absolute top-4 right-4 z-40">
          {headerContent}
        </div>
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
