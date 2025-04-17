
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, CalendarIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BirthInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BirthData) => void;
}

export interface BirthData {
  firstName: string;
  birthDate: Date | null;
  birthTime?: string;
  birthLocation?: string;
}

const BirthInfoModal = ({ isOpen, onClose, onSubmit }: BirthInfoModalProps) => {
  const [birthData, setBirthData] = useState<BirthData>({
    firstName: "",
    birthDate: null,
    birthTime: "",
    birthLocation: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBirthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Save to localStorage
    localStorage.setItem("askAstroBirthData", JSON.stringify(birthData));
    // Emit callback
    onSubmit(birthData);
    // Close modal
    onClose();
  };

  const isFormValid = birthData.firstName.trim() !== "" && birthData.birthDate !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] bg-card border-primary/20 animate-message-fade-in">
        <div className="absolute top-0 left-0 w-full h-1 bg-cosmic-gradient" />
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Hey! I'd love to look deeper into your stars 🌟
          </DialogTitle>
        </DialogHeader>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-background/80 transition-colors"
        >
          <X size={20} className="text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="py-4">
          <div className="text-center text-sm text-muted-foreground mb-4">
            Can you share your birth details?
          </div>
          
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={birthData.firstName}
                onChange={handleInputChange}
                placeholder="Your first name"
                className="cosmic-input"
              />
            </div>
            
            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="birthDate"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal cosmic-input",
                      !birthData.birthDate && "text-muted-foreground"
                    )}
                  >
                    {birthData.birthDate ? (
                      format(birthData.birthDate, "PPP")
                    ) : (
                      <span>Pick your birth date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthData.birthDate || undefined}
                    onSelect={(date) => setBirthData((prev) => ({ ...prev, birthDate: date }))}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Optional: Birth Time */}
            <div>
              <label htmlFor="birthTime" className="block text-sm font-medium mb-1 flex items-center">
                <Clock size={14} className="mr-1" />
                <span>Time of Birth (Optional)</span>
              </label>
              <Input
                id="birthTime"
                name="birthTime"
                type="time"
                value={birthData.birthTime}
                onChange={handleInputChange}
                placeholder="Time of birth"
                className="cosmic-input"
              />
            </div>
            
            {/* Optional: Birth Location */}
            <div>
              <label htmlFor="birthLocation" className="block text-sm font-medium mb-1 flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>City of Birth (Optional)</span>
              </label>
              <Input
                id="birthLocation"
                name="birthLocation"
                value={birthData.birthLocation}
                onChange={handleInputChange}
                placeholder="Where you were born"
                className="cosmic-input"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full bg-cosmic-gradient hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-opacity duration-200"
          >
            Continue
          </Button>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">
            We'll use this to personalize your cosmic guidance
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BirthInfoModal;
