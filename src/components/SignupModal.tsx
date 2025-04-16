
import React, { useState } from "react";
import { X } from "lucide-react";
import { useChat } from "../context/ChatContext";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetQuestionCount } = useChat();

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
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cosmic-input w-full py-2.5 px-4"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-cosmic-gradient hover:opacity-90 text-white font-medium py-2.5 px-4 rounded-lg transition-opacity duration-200"
              >
                Sign Up
              </button>
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
