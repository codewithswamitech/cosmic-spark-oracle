
import React, { useState } from "react";
import { X } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetQuestionCount } = useChat();
  
  // Detect if on Apple device (iOS/macOS)
  const isAppleDevice = typeof navigator !== 'undefined' && 
    (/iPhone|iPad|iPod|Mac/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app, you would handle the sign-up process here
      setIsSubmitted(true);
      resetQuestionCount();
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setEmail("");
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
    resetQuestionCount();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="bg-card relative rounded-2xl shadow-lg w-11/12 max-w-md overflow-hidden animate-message-fade-in z-10">
        {/* Cosmic top decoration */}
        <div className="h-2 bg-cosmic-gradient w-full" />
        
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-background/80 transition-colors"
        >
          <X size={20} className="text-muted-foreground" />
          <span className="sr-only">Close</span>
        </button>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="text-4xl animate-float">✨🔮✨</div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-center cosmic-gradient-text">
            Ready for Deeper Cosmic Guidance?
          </h2>
          
          <p className="text-center text-muted-foreground mb-6">
            Sign up to continue your celestial journey and unlock personalized readings!
          </p>
          
          {isSubmitted ? (
            <div className="text-center py-4 animate-message-fade-in">
              <div className="text-2xl mb-2">🌠</div>
              <p className="font-medium text-primary">Thank you for joining!</p>
              <p className="text-sm text-muted-foreground">
                Your cosmic journey continues...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cosmic-input w-full py-2.5 px-4"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-cosmic-gradient hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-opacity duration-200"
                >
                  Sign Up
                </Button>
                
                <Button
                  type="button" 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                      <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z" />
                    </g>
                  </svg>
                  Continue with Google
                </Button>
                
                {isAppleDevice && (
                  <Button
                    type="button" 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M17.05,12.04C17.02,9.03 19.41,7.63 19.5,7.58C18.3,5.82 16.44,5.58 15.88,5.56C14.29,5.39 12.76,6.51 12.05,6.51C11.27,6.51 10.05,5.57 8.69,5.59C6.89,5.62 5.2,6.69 4.28,8.34C2.41,11.67 3.82,16.56 5.6,19.44C6.5,20.86 7.54,22.47 8.94,22.42C10.3,22.37 10.81,21.55 12.4,21.55C13.96,21.55 14.44,22.42 15.87,22.39C17.34,22.37 18.24,20.95 19.1,19.5C20.17,17.82 20.62,16.19 20.65,16.08C20.58,16.06 17.08,14.76 17.05,12.04Z" />
                        <path d="M15.14,4.01C15.87,3.12 16.37,1.9 16.24,0.67C15.2,0.71 13.91,1.38 13.16,2.25C12.49,3.03 11.9,4.28 12.04,5.48C13.2,5.56 14.39,4.89 15.14,4.01Z" />
                      </g>
                    </svg>
                    Continue with Apple
                  </Button>
                )}
              </div>
            </form>
          )}
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
