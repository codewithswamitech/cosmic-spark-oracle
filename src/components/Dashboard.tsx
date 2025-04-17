
import React from "react";
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
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  
  // Convert to string and sum digits
  const dateSum = `${day}`.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const monthSum = `${month}`.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const yearSum = `${year}`.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  
  let total = dateSum + monthSum + yearSum;
  
  // Reduce to a single digit
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

const Dashboard = ({}: DashboardProps) => {
  const { birthData } = useChat();
  
  if (!birthData || !birthData.birthDate) {
    return <div className="text-center p-8">Loading your cosmic data...</div>;
  }
  
  const firstName = birthData.firstName;
  const zodiacSign = getZodiacSign(new Date(birthData.birthDate));
  const lifePathNumber = getLifePathNumber(new Date(birthData.birthDate));
  const element = getElement(zodiacSign);
  
  // Sample forecast data (in a real app, this would come from backend)
  const dailyForecast = "Today's moon in Cancer brings reflection — time to pause and center yourself.";
  const loveForecast = "Venus is entering your 7th house, bringing harmonious energy to relationships. A deep conversation tonight could lead to new understanding.";
  const careerForecast = "Push forward your ideas. Mercury aligns with your 10th house, creating favorable conditions for professional advancement.";
  const numerologyVibe = "You're in a Personal Day " + ((new Date().getDate() % 9) || 9) + " — focus on completion and preparing for new beginnings.";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* Side Navigation */}
      <aside className="lg:w-64 bg-card border-r border-border">
        <div className="p-4">
          <h2 className="text-xl font-bold cosmic-gradient-text mb-6">
            🔮 Ask Astro
          </h2>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved Predictions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Crown className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
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
          
          {/* Widget Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Energy */}
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
            
            {/* Love Forecast */}
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
            
            {/* Career Signal */}
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
            
            {/* Numerology Day Vibe */}
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
          
          {/* Sample Insight Cards */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Your Recent Insights</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {/* We'll use the InsightCard component we created */}
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
