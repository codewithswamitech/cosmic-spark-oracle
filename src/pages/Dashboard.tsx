
import React from "react";
import DashboardComponent from "@/components/Dashboard";
import { ThemeProvider } from "@/context/ThemeContext";
import { ChatProvider } from "@/context/ChatContext";

const DashboardPage = () => {
  return (
    <ThemeProvider>
      <ChatProvider>
        <DashboardComponent />
      </ChatProvider>
    </ThemeProvider>
  );
};

export default DashboardPage;
