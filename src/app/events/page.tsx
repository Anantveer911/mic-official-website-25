"use client";

import React, { useState, useEffect } from "react";

const events = [
  {
    title: "Cyber Security Treasure Hunt",
    desc: "The event emphasized critical thinking, time management, and cybersecurity fundamentals",
    details:
      "The Microsoft Innovation Club hosted an exciting “Cyber Security Treasure Hunt,” where participants engaged in clue-based challenges, quizzes, and problem-solving tasks. The event emphasized critical thinking, time management, and cybersecurity fundamentals. Teams followed a trail of hints to reach final answers, making for a fun and educational experience that concluded with the announcement of the winning teams.",
    bg: "bg-[#FFDFE8]",
    border: "border-[#E8A2B5]",
    text: "text-[#6d1c22]",
    borderColor: "#E8A2B5",
  },
  {
    title: "Sherlock IT!",
    desc: "Campus-wide puzzle hunt filled with engaging minigames and mystery-based challenges. ",
    details:
      "“Sherlock IT!”, held during Pre-Vibrance by the Microsoft Innovations Club, was a campus-wide puzzle hunt filled with engaging minigames and mystery-based challenges. Participants solved interconnected clues that unraveled an overarching storyline. The event blended problem-solving with fun, encouraging teamwork and critical thinking while creating a memorable, interactive experience across the VIT Chennai campus.",
    bg: "bg-[#C5FFD8]",
    border: "border-[#ABEEAB]",
    text: "text-[#095709]",
    borderColor: "#ABEEAB",
  },
  {
    title: "VITopoly RUSH",
    desc: "VITopoly Rush combined strategy, skill, and fun in a Monopoly-inspired competition.",
    details:
      "Held on Day 1 of Vibrance 2025, VITopoly Rush combined strategy, skill, and fun in a Monopoly-inspired competition. Participants played campus-wide mini-games to earn in-game currency, which they later used in strategic Monopoly rounds. Points earned in these final rounds determined the winners. The event challenged resource management, decision-making, and competitive spirit in an exciting, two-phase format.",
    bg: "bg-[#CBF1FD]",
    border: "border-[#B3D9FF]",
    text: "text-[#0A3A6b]",
    borderColor: "#B3D9FF",
  },
  {
    title: "How Hackers Really Hack 4.0",
    desc: "This two-day event featured ethical hacking expert Sriram Kesavan, who shared real-world cybersecurity practices.",
    details:
      "This two-day event featured ethical hacking expert Sriram Kesavan, who shared real-world cybersecurity practices. Day one included hands-on sessions on vulnerabilities and cyber defense, while day two hosted a thrilling 6-hour CTF contest. Participants applied their learning in competitive challenges, making it a comprehensive experience in practical cybersecurity.",
    bg: "bg-[#CBF1FD]",
    border: "border-[#B3D9FF]",
    text: "text-[#0A3A6b]",
    borderColor: "#B3D9FF",
  },
  {
    title: "Season of AI: India",
    desc: "This session explored India’s booming AI landscape and Microsoft's influence in it.",
    details:
      "Led by Gold MLSA Deepthi Balasubramanian, this session explored India’s booming AI landscape and Microsoft's influence in it. Attendees learned about responsible AI, Generative AI applications, and tools like Microsoft Copilot and Azure AI Studio. Live demos gave hands-on exposure to Models-as-a-Service and AI integration, empowering students to explore and build innovative, responsible AI solutions.",
    bg: "bg-[#fff4dd]",
    border: "border-[#FFD782]",
    text: "text-[#865B00]",
    borderColor: "#FFD782",
  },
  {
    title: "MLSA Explained",
    desc: "This workshop provided a complete overview of the Microsoft Learn Student Ambassadors (MLSA) program.",
    details: "This workshop provided a complete overview of the Microsoft Learn Student Ambassadors (MLSA) program. Speakers Sam Prince and Syed Omar shared insights into the program’s mission, benefits like Azure credits and LinkedIn Premium, and the application process. Attendees left motivated and informed about how to grow as student tech leaders through MLSA.",
    bg: "bg-[#C5FFD8]",
    border: "border-[#ABEEAB]",
    text: "text-[#095709]",
    borderColor: "#ABEEAB",
  },
];

type LineProps = {
  left: string;
  top: string;
  width: string;
  height: string;
  color?: string;
};

const Line: React.FC<LineProps> = ({
  left,
  top,
  width,
  height,
  color = "blue",
}) => (
  <div
    className="absolute pointer-events-none"
    style={{
      left,
      top,
      width,
      height,
      backgroundColor: color,
      borderRadius: 2,
      zIndex: 50,
    }}
  />
);

const LandingPage = () => {
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  React.useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "0")) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("keydown", preventKeyboardZoom);
    document.addEventListener("touchmove", preventScroll, { passive: false });

    if (openCard !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("keydown", preventKeyboardZoom);
      document.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "";
    };
  }, [openCard]);

  const getThemeColors = () => {
    if (isDarkMode) {
      return {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        lineColor: "#0B3A79",
        borderColor: "#1e40af",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)",
      };
    } else {
      return {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        lineColor: "#1e88e5",
        borderColor: "#3b82f6",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)",
      };
    }
  };

  const themeColors = getThemeColors();

  const renderOverlay = () => {
    if (openCard === null) return null;
    const event = events[openCard];
    return (
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70"
        style={{ backdropFilter: "blur(3px)" }}
        onClick={() => setOpenCard(null)}
      >
        <div
          className={`pixel-corners ${event.bg} ${event.text} relative shadow-2xl`}
          style={{
            width: "min(90vw, 600px)",
            minHeight: "min(60vh, 400px)",
            border: `16px solid ${event.borderColor}`,
            padding: "2.5rem 2rem",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            fontWeight: "bold",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-red-500 hover:scale-110 transition-transform transition-colors font-bold z-10 cursor-pointer"
            aria-label="Close"
            onClick={() => setOpenCard(null)}
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "50%",
              width: "2.5rem",
              height: "2.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            x
          </button>
          <span className="font-press-start text-3xl mb-4">
            {event.title}
          </span>
          <p
            className="font-IBM Plex Mono text-base mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {event.desc}
          </p>
          <div
            className="font-normal text-sm"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {event.details}
          </div>
        </div>
      </div>
    );
  };

  const getCardClass = (event: (typeof events)[0]) =>
    `pixel-corners font-press-start ${event.bg} ${event.text} cursor-pointer transition-all duration-200 hover:brightness-110 hover:border-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300${
      openCard === null ? " hover:scale-[1.03] hover:shadow-xl hover:-translate-y-1" : ""
    }`;

  return (
    <div
      className={`relative w-screen h-screen bg-cover bg-center overflow-hidden flex flex-col items-center ${themeColors.textColor}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
          ${themeColors.background}
        `,
        backgroundSize: "30px 30px, 30px 30px, 100% 100%",
        backgroundRepeat: "repeat, repeat, no-repeat",
        backgroundPosition: "top left, top left, center",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <Line left="3.6vw" top="14vh" width="5.8vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="9.1vw" top="5vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="14vh" width="0.3vw" height="70vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="84vh" width="5.6vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="9.1vw" top="84vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="9.1vw" top="93.5vh" width="80.7vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="89.5vw" top="84vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="89.8vw" top="84vh" width="6.2vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="95.8vw" top="14vh" width="0.3vw" height="70.5vh" color={themeColors.lineColor} />
      <Line left="90.6vw" top="14vh" width="5.6vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="90.6vw" top="5vh" width="0.3vw" height="9.5vh" color={themeColors.lineColor} />
      <Line left="9.2vw" top="5vh" width="81.3vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="45.5vh" width="3.9vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="7.5vw" top="45.5vh" width="0.3vw" height="8.5vh" color={themeColors.lineColor} />
      <Line left="3.6vw" top="53.5vh" width="3.9vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="32vh" width="3.6vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="32vh" width="0.3vw" height="8vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="43vh" width="0.3vw" height="4vh" color={themeColors.lineColor} />
      <Line left="92.1vw" top="47vh" width="3.9vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="78.6vw" top="5vh" width="0.3vw" height="6vh" color={themeColors.lineColor} />
      <Line left="69.5vw" top="10.5vh" width="9.2vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="3.9vw" top="76vh" width="4.3vw" height="0.5vh" color={themeColors.lineColor} />
      <Line left="7.9vw" top="69vh" width="0.3vw" height="7vh" color={themeColors.lineColor} />
      <Line left="7.9vw" top="69vh" width="4.3vw" height="0.5vh" color={themeColors.lineColor} />

      <img
        src="/greenghost.png"
        alt="Left Decor"
        className="absolute z-30 animate-bounce"
        style={{
          width: "min(1.8vw, 28px)",
          height: "min(1.8vw, 28px)",
          top: "70vh",
          right: "13.4vw",
        }}
      />
      <img
        src="/redghost.png.png"
        alt="Left Decor"
        className="absolute z-30 animate-bounce"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "21.5vh",
          left: "13.1vw",
        }}
      />
      <img
        src="/ghost.png"
        alt="Left Decor"
        className="absolute z-30 animate-bounce"
        style={{
          width: "min(2.5vw, 40px)",
          height: "min(2.1vw, 33px)",
          top: "43vh",
          left: "10.5vw",
        }}
      />
      <img
        src="/yellowghost.png"
        alt="Left Decor"
        className="absolute z-30 animate-bounce"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "68vh",
          left: "13.8vw",
        }}
      />
      <img
        src="/blueghost.png"
        alt="Right Decor"
        className="absolute z-30 animate-bounce"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "24vh",
          right: "12.4vw",
        }}
      />
      <img
        src="/yellowghost.png"
        alt="Right Decor"
        className="absolute z-30 animate-bounce"
        style={{
          width: "min(2vw, 32px)",
          height: "min(2vw, 32px)",
          top: "51vh",
          right: "8.8vw",
        }}
      />

      <h1
        className={`${themeColors.textColor} font-press-start z-10 text-center mt-14`}
        style={{ fontSize: "min(5vw, 3rem)" }}
      >
        EVENTS
      </h1>

      <div className="flex flex-col items-center justify-center h-full w-full max-w-none px-4">
        <div
          className="flex flex-row justify-center mb-2"
          style={{ gap: "min(2vw, 32px)" }}
        >
          {events.slice(0, 3).map((event, i) => (
            <div
              key={i}
              className={`${getCardClass(event)} flex flex-col items-center text-center`}
              style={{
                width: "min(20vw, 340px)",
                height: "min(30vh, 308px)",
                borderRadius: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                fontWeight: "bold",
                padding: "25px",
                position: "relative",
                boxSizing: "border-box",
                border: `14px solid ${event.borderColor}`,
              }}
              onClick={() => setOpenCard(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenCard(i);
                }
              }}
            >
              <span
                className="hover:underline"
                style={{ fontSize: "min(1.6vw, 24px)", transition: "0.2s" }}
              >
                {event.title}
              </span>
              <p
                className="info-text font-normal mt-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "min(0.8vw, 12px)",
                }}
              >
                {event.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="relative flex items-center w-full h-12 mx-auto "
          style={{ maxWidth: "min(63.2vw, 964px)" }}
        >
          <img
            src="/PacMan.gif"
            alt="Pac-Man"
            style={{
              width: "min(3.2vw, 48px)",
              height: "min(3.2vw, 48px)",
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
            }}
          />
          <div className="pellets-row">
            <div className="pellets-inner">
              {[...Array(48)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "min(1.05vw, 16px)",
                    height: "min(1.05vw, 16px)",
                  }}
                  className="bg-yellow-300 rounded-full shadow"
                ></div>
              ))}
              {[...Array(48)].map((_, i) => (
                <div
                  key={i + 48}
                  style={{
                    width: "min(1.05vw, 16px)",
                    height: "min(1.05vw, 16px)",
                  }}
                  className="bg-yellow-300 rounded-full shadow"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-row justify-center mt-2 mb-16"
          style={{ gap: "min(2vw, 32px)" }}
        >
          {events.slice(3, 6).map((event, i) => (
            <div
              key={i + 3}
              className={`${getCardClass(event)} flex flex-col items-center text-center`}
              style={{
                width: "min(20vw, 340px)",
                height: "min(30vh, 308px)",
                borderRadius: "0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                fontWeight: "bold",
                padding: "25px",
                position: "relative",
                boxSizing: "border-box",
                border: `12px solid ${event.borderColor}`,
              }}
              onClick={() => setOpenCard(i + 3)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenCard(i + 3);
                }
              }}
            >
              <span
                className="hover:underline"
                style={{ fontSize: "min(1.6vw, 24px)", transition: "0.2s" }}
              >
                {event.title}
              </span>
              <p
                className="info-text font-normal mt-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "min(0.8vw, 12px)",
                }}
              >
                {event.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="absolute flex flex-col z-50"
          style={{
            top: "34vh",
            right: "5.2vw",
            gap: "min(1vh, 14px)",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={`v-dot-${i}`}
              style={{
                width: "min(0.8vw, 12px)",
                height: "min(0.8vw, 12px)",
              }}
              className="bg-yellow-300 rounded-full"
            ></div>
          ))}
        </div>

        <div
          className="absolute flex flex-col z-50"
          style={{
            top: "48vh",
            left: "5.2vw",
            gap: "min(1vh, 14px)",
          }}
        >
          {[...Array(2)].map((_, i) => (
            <div
              key={`left-dot-${i}`}
              style={{
                width: "min(0.8vw, 12px)",
                height: "min(0.8vw, 12px)",
              }}
              className="bg-yellow-300 rounded-full"
            ></div>
          ))}
        </div>
      </div>

      <img
        src="/yellowghost.png"
        alt="Top Left Ghost"
        className="absolute top-20 left-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
        }}
      />
      <img
        src="/redghost.png.png"
        alt="Top Right Ghost"
        className="absolute top-20 right-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
        }}
      />
      <img
        src="/blueghost.png"
        alt="Bottom Left Ghost"
        className="absolute bottom-24 left-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
        }}
      />
      <img
        src="/pinkghost (1).png"
        alt="Bottom Right Ghost"
        className="absolute bottom-20 right-20 z-50"
        style={{
          width: "min(2.1vw, 32px)",
          height: "min(2.1vw, 32px)",
        }}
      />

      <div
        className="absolute top-6 left-6 right-6 z-40"
        style={{
          height: "min(0.5vh, 8px)",
          backgroundColor: themeColors.borderColor,
        }}
      ></div>
      <div
        className="absolute bottom-6 left-6 right-6 z-40"
        style={{
          height: "min(0.5vh, 8px)",
          backgroundColor: themeColors.borderColor,
        }}
      ></div>
      <div
        className="absolute top-6 bottom-6 left-6 z-40"
        style={{
          width: "min(0.5vw, 8px)",
          backgroundColor: themeColors.borderColor,
        }}
      ></div>
      <div
        className="absolute top-6 bottom-6 right-6 z-40"
        style={{
          width: "min(0.5vw, 8px)",
          backgroundColor: themeColors.borderColor,
        }}
      ></div>

      {renderOverlay()}
    </div>
  );
};

export default LandingPage;
