import React, { useState, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { 
  Calendar,
  Heart,
  TrendingUp,
  Hash,
  User,
  Bookmark,
  Crown,
  Settings,
  LogOut,
  Plus,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProfileEdit } from "./ProfileEdit";
import { UpgradePlans } from "./UpgradePlans";

interface DashboardProps {
  // Props if needed
}

const getZodiacSign = (birthDate: Date): string => {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius ♒";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces ♓";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries ♈";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus ♉";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini ♊";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer ♋";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo ♌";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo ♍";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra ♎";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio ♏";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius ♐";
  return "Capricorn ♑";
};

const getLifePathNumber = (birthDate: Date): number => {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  
  const dateSum = `${day}`.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const monthSum = `${month}`.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const yearSum = `${year}`.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  
  let total = dateSum + monthSum + yearSum;
  
  while (total > 9) {
    total = `${total}`.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  
  return total;
};

const getElement = (sign: string): string => {
  const fireSign = ["Aries ♈", "Leo ♌", "Sagittarius ♐"];
  const earthSign = ["Taurus ♉", "Virgo ♍", "Capricorn ♑"];
  const airSign = ["Gemini ♊", "Libra ♎", "Aquarius ♒"];
  const waterSign = ["Cancer ♋", "Scorpio ♏", "Pisces ♓"];

  if (fireSign.includes(sign)) return "Fire 🔥";
  if (earthSign.includes(sign)) return "Earth 🌎";
  if (airSign.includes(sign)) return "Air 💨";
  if (waterSign.includes(sign)) return "Water 💧";
  return "";
};

const Dashboard = () => {
  const { birthData, setShowBirthModal, clearMessages, resetQuestionCount } = useChat();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="text-center">
          <p className="text-xl mb-4">Loading your cosmic data...</p>
          <div className="h-1 w-48 bg-cosmic-gradient animate-pulse rounded-full"></div>
        </div>
      </div>
    );
  }
  
  if (!birthData || !birthData.birthDate) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4">We need your birth information to generate your cosmic profile.</h2>
          <div className="space-y-4 mt-6">
            <Button 
              onClick={() => setShowBirthModal(true)} 
              className="w-full bg-cosmic-gradient hover:opacity-90"
            >
              Enter Birth Information
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="w-full"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const firstName = birthData.firstName || "Cosmic Friend";
  const zodiacSign = getZodiacSign(new Date(birthData.birthDate));
  const lifePathNumber = getLifePathNumber(new Date(birthData.birthDate));
  const element = getElement(zodiacSign);
  
  const dailyForecast = "Today's moon in Cancer brings reflection — time to pause and center yourself.";
  const loveForecast = "Venus is entering your 7th house, bringing harmonious energy to relationships. A deep conversation tonight could lead to new understanding.";
  const careerForecast = "Push forward your ideas. Mercury aligns with your 10th house, creating favorable conditions for professional advancement.";
  const numerologyVibe = "You're in a Personal Day " + ((new Date().getDate() % 9) || 9) + " — focus on completion and preparing for new beginnings.";

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    toast.info(`Navigated to ${section}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleNewChat = () => {
    clearMessages();
    resetQuestionCount();
    setActiveSection("dashboard");
    toast.success("Started a new chat!");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileEdit />;
      case "predictions":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Saved Predictions</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <p className="text-muted-foreground">You haven't saved any predictions yet.</p>
              <Button className="mt-4">Explore Predictions</Button>
            </div>
          </div>
        );
      case "upgrade":
        return <UpgradePlans />;
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl mb-2">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <Button variant="outline" size="sm">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Language</span>
                  <Button variant="outline" size="sm">English</Button>
                </div>
              </div>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {firstName} 👋
                </h1>
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="bg-secondary/50 px-3 py-1 rounded-full text-sm flex items-center">
                    {zodiacSign}
                  </div>
                  <div className="bg-secondary/50 px-3 py-1 rounded-full text-sm flex items-center">
                    Life Path: {lifePathNumber}
                  </div>
                  <div className="bg-secondary/50 px-3 py-1 rounded-full text-sm flex items-center">
                    Element: {element}
                  </div>
                </div>
              </div>
              <Button
                onClick={handleNewChat}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cosmic-card overflow-hidden">
                <div className="h-1 bg-cosmic-gradient w-full" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    🌞 Daily Energy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{dailyForecast}</p>
                </CardContent>
              </Card>
              
              <Card className="cosmic-card overflow-hidden">
                <div className="h-1 bg-cosmic-gradient w-full" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-primary" />
                    ❤️ Love Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{loveForecast}</p>
                </CardContent>
              </Card>
              
              <Card className="cosmic-card overflow-hidden">
                <div className="h-1 bg-cosmic-gradient w-full" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    📈 Career Signal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{careerForecast}</p>
                </CardContent>
              </Card>
              
              <Card className="cosmic-card overflow-hidden">
                <div className="h-1 bg-cosmic-gradient w-full" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Hash className="mr-2 h-5 w-5 text-primary" />
                    🔢 Numerology Day Vibe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{numerologyVibe}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Your Recent Insights</h2>
              <div className="flex gap-4 overflow-x-auto pb-4">
                <div className="min-w-[250px] max-w-[250px]">
                  <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-primary font-medium">Your Mood Today</div>
                    <p className="text-sm mt-2 line-clamp-3">
                      Your emotional energy is glowing — you attract harmony today.
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Tap to view full card
                    </div>
                  </div>
                </div>
                
                <div className="min-w-[250px] max-w-[250px]">
                  <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-primary font-medium">Your Love Signal</div>
                    <p className="text-sm mt-2 line-clamp-3">
                      Venus brings deep connections. Be open to meaningful conversations tonight.
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Tap to view full card
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-background">
            <div className="text-center">
              <p className="text-xl mb-4">Loading your cosmic data...</p>
              <div className="h-1 w-48 bg-cosmic-gradient animate-pulse rounded-full"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <aside className="lg:w-64 bg-card border-r border-border">
        <div className="p-4">
          <h2 className="text-xl font-bold cosmic-gradient-text mb-6">
            🔮 Ask Astro
          </h2>
          
          <nav className="space-y-1">
            <Button 
              variant={activeSection === "dashboard" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleNavigation("dashboard")}
            >
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button 
              variant={activeSection === "profile" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleNavigation("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button 
              variant={activeSection === "predictions" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleNavigation("predictions")}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Predictions
            </Button>
            <Button 
              variant={activeSection === "upgrade" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleNavigation("upgrade")}
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
            <Button 
              variant={activeSection === "settings" ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => handleNavigation("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </aside>
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
