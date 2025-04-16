
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="w-full pt-6 pb-2 md:py-8 px-4 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-screen-md flex justify-between items-center">
        <div className="flex-1">
          {/* Spacer for alignment */}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold cosmic-gradient-text flex items-center justify-center">
              🔮 Ask Astro
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 animate-pulse-subtle">
              Your Personal AI Astrologer
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
