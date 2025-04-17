
import React, { useState } from "react";
import { zodiacSigns } from "@/utils/zodiacData";
import { useChat } from "@/context/ChatContext";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, MapPin, Heart, Home, Phone, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

// Define the interface for form data separately from BirthData
interface ProfileFormData {
  firstName: string;
  birthTime: string;
  birthPlace: string;
  partnerName: string;
  houseNumber: string;
  mobileNumber: string;
  alternateNumber: string;
  vehicleNumber: string;
}

export const ProfileEdit = () => {
  const { birthData, setBirthData } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    birthData?.birthDate ? new Date(birthData.birthDate) : undefined
  );
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: birthData?.firstName || "",
    birthTime: birthData?.birthTime || "",
    birthPlace: birthData?.birthPlace || "",
    partnerName: birthData?.partnerName || "",
    houseNumber: birthData?.houseNumber || "",
    mobileNumber: birthData?.mobileNumber || "",
    alternateNumber: birthData?.alternateNumber || "",
    vehicleNumber: birthData?.vehicleNumber || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    // Update the birth data in context with the correct types
    if (setBirthData) {
      setBirthData({
        ...formData,
        birthDate: selectedDate || null,
      });
    }
    
    // Store data in localStorage (we need to convert Date to string for storage)
    const storageData = {
      ...formData,
      birthDate: selectedDate ? selectedDate.toISOString() : null,
    };
    localStorage.setItem("profileData", JSON.stringify(storageData));
    setIsEditing(false);
    toast.success("Profile saved successfully!");
  };

  // Load data from localStorage on first render
  React.useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData({
          firstName: parsedData.firstName || "",
          birthTime: parsedData.birthTime || "",
          birthPlace: parsedData.birthPlace || "",
          partnerName: parsedData.partnerName || "",
          houseNumber: parsedData.houseNumber || "",
          mobileNumber: parsedData.mobileNumber || "",
          alternateNumber: parsedData.alternateNumber || "",
          vehicleNumber: parsedData.vehicleNumber || "",
        });
        if (parsedData.birthDate) {
          setSelectedDate(new Date(parsedData.birthDate));
        }
      } catch (error) {
        console.error("Error parsing profile data from localStorage:", error);
      }
    }
  }, []);

  // Get zodiac sign based on birth date
  const getZodiacSign = (birthDate: Date | undefined): string => {
    if (!birthDate) return "Unknown";
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

  const getLifePathNumber = (birthDate: Date | undefined): number => {
    if (!birthDate) return 0;
    
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

  const zodiacSign = getZodiacSign(selectedDate);
  const element = getElement(zodiacSign);
  const lifePathNumber = getLifePathNumber(selectedDate);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Profile</h2>
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsEditing(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              variant="default"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        
        {/* View Mode */}
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{formData.firstName || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">Zodiac Sign:</p>
              <p>{zodiacSign}</p>
            </div>
            <div>
              <p className="font-semibold">Element:</p>
              <p>{element}</p>
            </div>
            <div>
              <p className="font-semibold">Life Path Number:</p>
              <p>{lifePathNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Birth Date:</p>
              <p>{selectedDate ? format(selectedDate, 'PP') : "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">Birth Time:</p>
              <p>{formData.birthTime || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">Birth Place:</p>
              <p>{formData.birthPlace || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">Partner Name:</p>
              <p>{formData.partnerName || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">House Number:</p>
              <p>{formData.houseNumber || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">Mobile Number:</p>
              <p>{formData.mobileNumber || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">Alternate Number:</p>
              <p>{formData.alternateNumber || "Not set"}</p>
            </div>
            <div>
              <p className="font-semibold">Vehicle Number:</p>
              <p>{formData.vehicleNumber || "Not set"}</p>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <div className="mt-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PP') : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <Label htmlFor="birthTime">Birth Time</Label>
              <div className="relative mt-1">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="birthTime"
                  name="birthTime"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="HH:MM AM/PM"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="birthPlace">Birth Place</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="partnerName">Partner Name</Label>
              <div className="relative mt-1">
                <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="partnerName"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="houseNumber">House Number</Label>
              <div className="relative mt-1">
                <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="pl-10"
                  type="tel"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="alternateNumber">Alternate Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="alternateNumber"
                  name="alternateNumber"
                  value={formData.alternateNumber}
                  onChange={handleChange}
                  className="pl-10"
                  type="tel"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <div className="relative mt-1">
                <Car className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
