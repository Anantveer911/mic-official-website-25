'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArcadeCabinet, 
  Clouds, 
  getThemeColors, 
  ARCADE_WIDTH, 
  ARCADE_HEIGHT 
} from './_components'; 

const LeaderboardPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  // 1. Theme Detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. Responsive Scaling Logic (Aggressive Zoom - Hides Bottom Base)
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      const TARGET_HEIGHT = 810; 

      const scaleFitWidth = (vw - 20) / ARCADE_WIDTH;
      const scaleFitHeight = vh / TARGET_HEIGHT;
      let finalScale = Math.min(scaleFitWidth, scaleFitHeight);

      if (vh > vw) {
         finalScale = vw / ARCADE_WIDTH;
      }

      setScale(finalScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const themeColors = getThemeColors(isDarkMode);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
          ${themeColors.background}
        `,
        backgroundSize: '30px 30px, 30px 30px, 100% 100%',
        backgroundRepeat: 'repeat, repeat, no-repeat',
        backgroundPosition: 'top left, top left, center',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <Clouds />

      {isLoading ? (
        <div className="animate-pulse text-center z-20">
           <div 
             className="text-xl font-bold font-press-start"
             style={{ color: themeColors.textColor, fontFamily: "'Press Start 2P', monospace" }}
           >
             LOADING SYSTEM...
           </div>
        </div>
      ) : (
        <div className="z-10 transition-opacity duration-500 ease-in opacity-100">
           <ArcadeCabinet 
             scale={scale} 
             themeColors={themeColors} 
           />
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;