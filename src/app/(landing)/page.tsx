"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Cartridge from "./Cartridge";
import Console from "./Console";
import LoadingPage from "./loading";

export default function Landing() {
  const [inserted, setInserted] = useState(false);
  const [poweredOn, setPoweredOn] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const router = useRouter();
  const splashTimeoutRef = useRef<NodeJS.Timeout>();
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();

  const handleInsert = () => {
    setInserted(true);
  };

  const handlePower = () => {
    if (inserted && !poweredOn) {
      setPoweredOn(true);

      // Clear any existing timeouts
      if (splashTimeoutRef.current) {
        clearTimeout(splashTimeoutRef.current);
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }

      // After 0.5 seconds of booting up, show splash
      splashTimeoutRef.current = setTimeout(() => {
        setShowSplash(true);
      }, 500);

      // After another 4.5 seconds (total 5 seconds), navigate to /main
      navigationTimeoutRef.current = setTimeout(() => {
        router.push("/main");
      }, 5000);
    }
  };

  const handleReset = () => {
    if (inserted) {
      // Clear any pending timeouts
      if (splashTimeoutRef.current) {
        clearTimeout(splashTimeoutRef.current);
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }

      setInserted(false);
      setPoweredOn(false);
      setShowSplash(false);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (splashTimeoutRef.current) {
        clearTimeout(splashTimeoutRef.current);
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-black opacity-50 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Centered container with fixed aspect ratio */}
      <div className="relative w-full max-w-[400px] aspect-[3/2] z-10">
        {/* Console component with poweredOn prop */}
        <Console poweredOn={poweredOn} />
        <Cartridge inserted={inserted} onClick={handleInsert} />

        {/* Power and Reset buttons - positioned over the console */}
        {inserted && (
          <>
            <button
              onClick={handlePower}
              disabled={poweredOn}
              className={`absolute top-[27%] left-[66%] w-[10%] h-[10%] cursor-pointer z-50 bg-transparent border-none ${poweredOn ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                }`}
              title="Power"
              type="button"
              aria-label="Power button"
            />
            <button
              onClick={handleReset}
              className="absolute top-[37%] left-[66%] w-[10%] h-[10%] cursor-pointer z-50 bg-transparent border-none hover:opacity-80"
              title="Reset"
              type="button"
              aria-label="Reset button"
            />
          </>
        )}
      </div>

      {/* Instruction text */}
      {!inserted && (
        <p className="text-white text-sm absolute top-10 left-1/2 -translate-x-1/2 animate-pulse z-50 pointer-events-none select-none">
          Click the Cartridge to Proceed
        </p>
      )}

      {/* Status messages */}
      {inserted && !poweredOn && (
        <p className="text-green-400 text-sm absolute bottom-24 left-1/2 -translate-x-1/2 animate-pulse z-50 pointer-events-none select-none">
          Press Power to start
        </p>
      )}
      {poweredOn && !showSplash && (
        <p className="text-yellow-400 text-sm absolute bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none">
          Booting up...
        </p>
      )}

      {/* Splash screen overlay */}
      {showSplash && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50">
          <LoadingPage />
        </div>
      )}
    </div>
  );
}