"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";


const ClubLogo = () => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: 80,
      transform: 'translateX(-50%)',
      zIndex: 12,
    }}
  >
    <Image
      src="/images/Group 204.png"
      alt="Microsoft Innovations Club Logo"
      width={700}
      height={180}
      style={{ width: '90vw', maxWidth: 800, height: 'auto', display: 'block' }}
      priority
    />
  </div>
);

const Cube = () => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      top: 210,
      transform: 'translateX(-50%)',
      zIndex: 11,
    }}
  >
    <Image
      src="/cube.svg"
      alt="Microsoft Innovations Club Logo"
      width={700}
      height={180}
      style={{ width: '70vw', maxWidth: 500, height: 'auto', display: 'block' }}
      priority
    />
  </div>
);

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const [left, setLeft] = useState(baseLeft);
  
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    
    animate();
    
    function handleResize() {
      const vw = window.innerWidth;
      const scale = vw / 1920;
      setLeft(baseLeft * scale);
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      running = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [baseTop, baseLeft, amplitude, speed, phase]);

  return { top, left };
}

const Clouds = ({ clouds }: { clouds: { top: number; left: number }[] }) => (
  <>
    {clouds.map((cloud, idx) => (
      <Image
        key={idx}
        src={`/images/cloud${(idx % 3) + 1}.png`}
        alt={`Cloud ${idx + 1}`}
        width={idx % 3 === 2 ? 204 : idx % 3 === 1 ? 367 : 355}
        height={idx % 3 === 2 ? 125 : idx % 3 === 1 ? 219 : 228}
        style={{ 
          position: 'absolute', 
          top: `${cloud.top}px`, 
          left: `${cloud.left}px`, 
          zIndex: 2 
        }}
        priority
      />
    ))}
  </>
);


const LandingPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

  const cloudPositions = [
    { baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 },
    { baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 },
    { baseTop: 700, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 },
    { baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 },
    { baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 },
    { baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 },
    { baseTop: -23, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 },
    { baseTop: 604.98, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 },
    { baseTop: 127.98, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 },
    { baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 },
  ].map(useCloudFloat);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

   const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };
  const themeColors = getThemeColors();
  useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }, []);

  return (
    <div className="w-full min-h-screen flex flex-col  relative overflow-hidden" style={{
              backgroundImage: `
                linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
                linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
                ${themeColors.background}
              `,
              backgroundSize: "30px 30px, 30px 30px, 100% 100%",
              backgroundRepeat: "repeat, repeat, no-repeat",
              backgroundPosition: "top left, top left, center",
              userSelect: "none",
            }}>
    <div className="w-full min-h-screen flex flex-col mt-5 relative overflow-hidden">
      
      <a
        href="https://www.instagram.com/microsoft.innovations.vitc/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1 right-52 z-50"
      >
        <Image
          src="/insta.svg"
          alt="Instagram Logo"
          width={72}
          height={78}
          style={{ width: "90vw", maxWidth: 72, height: "auto", display: "block" }}
          priority
        />
      </a>
      <a
        href="https://www.linkedin.com/company/microsoft-innovations-club-vitc/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1 right-28 z-50"
      >
        <Image
          src="/linkedin.svg"
          alt="LinkedIn Logo"
          width={72}
          height={78}
          style={{ width: "90vw", maxWidth: 72, height: "auto", display: "block" }}
          priority
        />
      </a>
      <a
        href="mailto:mic.vit.chennai@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-1 right-5 z-50"
      >
        <Image
          src="/mail.svg"
          alt="Mail Logo"
          width={72}
          height={78}
          style={{ width: "90vw", maxWidth: 72, height: "auto", display: "block" }}
          priority
        />
      </a>
      <a
        href="/leaderboard"
        rel="noopener noreferrer"
        className="absolute bottom-12 left-11 z-50"
      >
        <Image
          src="/cup_home.svg"
          alt="Leaderboard Logo"
          width={72}
          height={78}
          style={{ width: "90vw", maxWidth: 72, height: "auto", display: "block" }}
          priority
        />
      </a>

      <Clouds clouds={cloudPositions} />
      <ClubLogo />
      <Cube />
    </div>
    </div>
  );
};

export default LandingPage;