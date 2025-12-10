"use client"; 
import React, { useState, useEffect } from "react";
import Image from "next/image";

// --- 1. CLOUDS (FIXED POSITIONS) ---
const clouds = [
  { src: "/images/cloud1.png", alt: "Cloud", width: 200, height: 100, style: { top: "10vh", left: "5vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 180, height: 90,  style: { top: "5vh",  left: "20vw", zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 250, height: 125, style: { top: "8vh",  left: "52vw", zIndex: 0 } },
  { src: "/images/cloud1.png", alt: "Cloud", width: 160, height: 80,  style: { top: "20vh", left: "85vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 220, height: 110, style: { top: "75vh", left: "25vw", zIndex: 0 } },
  { src: "/images/cloud3.png", alt: "Cloud", width: 190, height: 95,  style: { top: "65vh", left: "10vw", zIndex: 0 } },
  { src: "/images/cloud2.png", alt: "Cloud", width: 380, height: 110, style: { top: "75vh", left: "72vw", zIndex: 0 } }
];

// --- 2. PIPES (ALIGNED & POSITIONED) ---
const pipes = [
  { type: "bottom", left: "12vw", height: "30vh" },
  { type: "top", left: "38vw", height: "40vh" },
  { type: "bottom", left: "65vw", height: "45vh" },
  { type: "bottom", left: "85vw", height: "25vh" },
];

// --- 3. ICONS (Aligned to Pipes) ---
const icons = [
  {
    href: "mailto:micvitcc@gmail.com",
    src: "/images/mail.png",
    alt: "Email",
    width: 70,
    height: 50,
    left: "13.5vw", 
    bottom: "40vh", 
    aria: "Send Email",
  },
  {
    href: "https://www.instagram.com/microsoft.innovations.vitc/?hl=en",
    src: "/images/instagram.png",
    alt: "Instagram",
    width: 70,
    height: 50,
    left: "66.5vw", 
    bottom: "55vh", 
    aria: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in",
    src: "/images/linkedin.png",
    alt: "LinkedIn",
    width: 70,
    height: 50,
    left: "86.5vw", 
    bottom: "35vh", 
    aria: "LinkedIn",
  },
];

// --- 4. BIRD ---
const bird = {
  src: "/images/bird.png",
  alt: "Flappy Bird",
  width: 75,
  height: 55,
  left: "40vw", 
  top: "70vh", 
};

const PIPE_BRANCH_HEIGHT = 80;
const PIPE_WIDTH = 120;
const PIPE_HEAD_WIDTH = 140;
const PIPE_HEAD_HEIGHT = 50;


export default function SocialPage() {
  const [pageHeight, setPageHeight] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  
  // THEME STATE
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Theme Detection (From Projects Code)
  useEffect(() => {
    // Dimensions
    if (typeof window !== 'undefined') {
      setPageHeight(window.innerHeight);
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }

    // Dark Mode Listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Simulate loading like in Projects page
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      clearTimeout(timer);
    };
  }, []);

  // 2. Helper Functions
  function getBranchCount(heightString: string) {
    if (pageHeight === null) return 0;
    const vhValue = parseFloat(heightString);
    const heightPx = (vhValue / 100) * pageHeight;
    return Math.ceil(heightPx / PIPE_BRANCH_HEIGHT);
  }

  const getResponsiveSize = (baseSize: number) => {
    if (screenSize.width < 1024) return baseSize * 0.7; 
    if (screenSize.width < 1366) return baseSize * 0.8; 
    if (screenSize.width < 1920) return baseSize * 0.9; 
    return baseSize; 
  };

  // 3. Theme Colors Logic (Exactly as requested)
  const getThemeColors = () => ({
    background: isDarkMode
      ? 'linear-gradient(to bottom, #00040d 0%, #002855 100%)'
      : 'linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)',
    lineColor: isDarkMode ? '#0B3A79' : '#1e88e5',
    borderColor: isDarkMode ? '#1e40af' : '#3b82f6',
    textColor: isDarkMode ? 'text-white' : 'text-gray-900',
    gridOpacity: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
  });

  if (pageHeight === null) return null;

  const themeColors = getThemeColors();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        // THE EXACT BACKGROUND LOGIC FROM YOUR SNIPPET:
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
      {/* GLOBAL STYLES FOR ANIMATION */}
      <style jsx global>{`
        @keyframes floatCloud {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
    
      `}</style>

      {/* Loading State (Optional, but included in your snippet) */}
      {isLoading ? (
         <div style={{ opacity: 0 }}></div> 
      ) : (
        <>

            {/* Clouds */}
            {clouds.map((cloud, i) => (
                <Image
                key={i}
                src={cloud.src}
                alt={cloud.alt}
                width={getResponsiveSize(cloud.width)}
                height={getResponsiveSize(cloud.height)}
                style={{
                    position: "absolute",
                    top: cloud.style.top,
                    left: cloud.style.left,
                    zIndex: 0, 
                    pointerEvents: "none",
                    filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
                    opacity: 0.9,
                    maxWidth: "20vw", 
                    height: "auto",
                    animation: `floatCloud ${4 + i % 3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`
                }}
                priority
                />
            ))}

            {/* Pipes */}
            {pipes.map((pipe, i) => {
                const branchCount = getBranchCount(pipe.height);
                const responsivePipeWidth = getResponsiveSize(PIPE_WIDTH);
                const responsiveHeadWidth = getResponsiveSize(PIPE_HEAD_WIDTH);
                const responsiveHeadHeight = getResponsiveSize(PIPE_HEAD_HEIGHT);

                const isTop = pipe.type === "top";

                return (
                <div
                    key={i}
                    style={{
                    position: "absolute",
                    left: pipe.left,
                    top: isTop ? "0" : "auto",
                    bottom: isTop ? "auto" : "0",
                    width: responsivePipeWidth,
                    height: "auto",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column", 
                    alignItems: "center",
                    pointerEvents: "none",
                    }}
                >
                    {isTop && (
                    <>
                        <div style={{ position: "relative", width: responsivePipeWidth, height: pipe.height, overflow: 'hidden' }}>
                        {Array.from({ length: branchCount }).map((_, idx) => (
                            <Image
                            key={idx}
                            src="/images/pipebranch.png"
                            alt=""
                            width={responsivePipeWidth}
                            height={PIPE_BRANCH_HEIGHT}
                            style={{ width: "100%", height: PIPE_BRANCH_HEIGHT, position: "absolute", bottom: idx * PIPE_BRANCH_HEIGHT }}
                            />
                        ))}
                        </div>
                        <div style={{ zIndex: 2 }}> 
                        <Image
                            src="/images/pipehead.png"
                            alt=""
                            width={responsiveHeadWidth}
                            height={responsiveHeadHeight}
                            style={{ width: responsiveHeadWidth, height: responsiveHeadHeight, transform: "scaleY(-1)" }}
                        />
                        </div>
                    </>
                    )}

                    {!isTop && (
                    <>
                        <div style={{ zIndex: 2, marginBottom: -1 }}> 
                        <Image
                            src="/images/pipehead.png"
                            alt=""
                            width={responsiveHeadWidth}
                            height={responsiveHeadHeight}
                            style={{ width: responsiveHeadWidth, height: responsiveHeadHeight }}
                        />
                        </div>
                        <div style={{ position: "relative", width: responsivePipeWidth, height: pipe.height, overflow: 'hidden' }}>
                        {Array.from({ length: branchCount }).map((_, idx) => (
                            <Image
                            key={idx}
                            src="/images/pipebranch.png"
                            alt=""
                            width={responsivePipeWidth}
                            height={PIPE_BRANCH_HEIGHT}
                            style={{ width: "100%", height: PIPE_BRANCH_HEIGHT, position: "absolute", top: idx * PIPE_BRANCH_HEIGHT }}
                            />
                        ))}
                        </div>
                    </>
                    )}
                </div>
                );
            })}

            {/* Social Icons */}
            {icons.map((icon, i) => (
                <a
                key={i}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon.aria}
                style={{
                    position: "absolute",
                    left: icon.left,
                    bottom: icon.bottom,
                    zIndex: 3,
                    transition: "transform 0.2s",
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1) translateY(-5px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}
                >
                <Image 
                    src={icon.src} 
                    alt={icon.alt} 
                    width={getResponsiveSize(icon.width)} 
                    height={getResponsiveSize(icon.height)}
                    style={{ width: "auto", height: "auto" }}
                />
                </a>
            ))}

            {/* Bird */}
            <div
                style={{
                position: "absolute",
                left: bird.left,
                top: bird.top,
                zIndex: 2,
                animation: "floatBird 2s ease-in-out infinite",
                }}
            >
                <Image
                src={bird.src}
                alt={bird.alt}
                width={getResponsiveSize(bird.width)}
                height={getResponsiveSize(bird.height)}
                style={{
                    maxWidth: "10vw",
                    height: "auto",
                }}
                />
            </div>
        </>
      )}
    </div>
  );
}