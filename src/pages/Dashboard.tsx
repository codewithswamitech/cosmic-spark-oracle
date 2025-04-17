
import React, { useEffect } from "react";
import DashboardComponent from "@/components/Dashboard";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider } from "@/context/ChatContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DashboardPage = () => {
  const navigate = useNavigate();
  
  // Add useEffect to check login status
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Please login to access the dashboard");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="absolute top-4 right-4 z-50">
          <Button onClick={handleLogout} variant="outline" size="sm">
            Logout
          </Button>
        </div>
        <DashboardComponent />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default DashboardPage;
