"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Larger cloud images & new variety
const cloudImages = [
  '/images/cloud1.png',
  '/images/cloud2.png',
  '/images/cloud1.png',
  '/images/cloud3.png',
  '/images/cloud3.png',
  '/images/cloud2.png',
  '/images/cloud1.png',
  '/images/cloud3.png',
  '/images/cloud2.png',
  '/images/cloud1.png',
];

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

// Floating cloud animation hook
function useCloudFloat({ baseTop, baseLeft, amplitude = 35, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
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
    return () => { running = false; };
  }, [baseTop, amplitude, speed, phase]);
  return { top, left: baseLeft };
}

const MysteryCard = ({
  frameColor, innerColor, dotColor, title, desc, style,
}: {
  frameColor: string;
  innerColor: string;
  dotColor: string;
  title: string;
  desc: string;
  style?: React.CSSProperties;
}) => (
  <div
    className="mystery-card group"
    style={{
      background: frameColor,
      borderColor: frameColor,
      boxShadow: `0 0 0 4px ${dotColor}50`,
      ...style,
    }}
  >
    <div className="inner-panel" style={{ background: innerColor }} />
    <div className="corner-dot top-left" style={{ background: dotColor }} />
    <div className="corner-dot top-right" style={{ background: dotColor }} />
    <div className="corner-dot bottom-left" style={{ background: dotColor }} />
    <div className="corner-dot bottom-right" style={{ background: dotColor }} />
    <div className="fixed-title" style={{ color: dotColor }}><h3>{title}</h3></div>
    <div className="scrollable-content" style={{ color: dotColor }}><p>{desc}</p></div>
    <div className="hover-question"><span style={{ color: dotColor }}>?</span></div>
    <div className="scroll-down-arrow">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke={dotColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <style jsx>{`
      .mystery-card {
        width: 320px;
        height: 290px;
        border: 10px solid;
        border-radius: 6.95px;
        position: relative;
        display: flex;
        flex-direction: column;
        opacity: 1;
        cursor: default;
        transition: all 0.3s ease;
        overflow: hidden;
        margin: 0;
        flex: 0 0 auto;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      }
      .inner-panel {
        position: absolute;
        left: 8px;
        top: 8px;
        right: 8px;
        bottom: 8px;
        border-radius: 4px;
        z-index: 8;
      }
      .corner-dot {
        width: 18px;
        height: 18px;
        border-radius: 2px;
        position: absolute;
        z-index: 12;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      }
      .top-left { top: -9px; left: -9px;}
      .top-right { top: -9px; right: -9px;}
      .bottom-left { bottom: -9px; left: -9px;}
      .bottom-right { bottom: -9px; right: -9px;}
      .fixed-title {
        position: absolute; top: 22px; left: 0; right: 0;
        text-align: center; z-index: 25; pointer-events: none;
        opacity: 0; transition: opacity 0.3s ease;
      }
      .fixed-title h3 {
        font-family: "Press Start 2P", monospace; font-weight: 700;
        font-size: clamp(0.65rem, 2vw, 0.9rem); text-transform: capitalize;
        text-shadow: 2px 2px 0 #fff, 4px 4px 0 #000; margin: 0; letter-spacing: 1px;
      }
      .scrollable-content {
        position: absolute; top: 60px; left: 24px; right: 24px; bottom: 40px;
        z-index: 25; overflow-y: auto; pointer-events: auto;
        opacity: 0; transition: opacity 0.3s ease;
        scrollbar-width: none;
        padding-right: 8px;
      }
      .scrollable-content::-webkit-scrollbar {
        display: none;
      }
      .scrollable-content p {
        font-family: "IBM Plex Mono", monospace; font-size: clamp(0.85rem, 2vw, 1.07rem); color: #444; line-height: 1.62; margin: 0; text-align: center;
      }
      .hover-question {
        position: absolute; inset: 0; display: flex; justify-content: center; align-items: center;
        font-size: clamp(2.5rem, 8vw, 4.2rem); font-weight: 900; font-family: "Press Start 2P", monospace;
        letter-spacing: 2px; user-select: none; margin-top: 10px; transition: opacity 0.3s ease; z-index: 20;
        pointer-events: none; opacity: 1;
      }
      .scroll-down-arrow {
        position: absolute;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 25;
        animation: bounceDown 2s infinite;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      @keyframes bounceDown {
        0%, 20%, 50%, 80%, 100% {
          transform: translateX(-50%) translateY(0);
        }
        40% {
          transform: translateX(-50%) translateY(-8px);
        }
        60% {
          transform: translateX(-50%) translateY(-4px);
        }
      }
      .group:hover .hover-question { opacity: 0; }
      .group:hover .scroll-down-arrow { opacity: 1; }
      .group:hover .fixed-title { opacity: 1; }
      .group:hover .scrollable-content { opacity: 1; }
      @media (max-width: 1200px) {
        .mystery-card { width: clamp(280px, 90vw, 320px); height: clamp(260px, 85vw, 290px); border: clamp(7px, 2vw, 10px) solid; }
        .corner-dot { width: clamp(14px, 3vw, 18px); height: clamp(14px, 3vw, 18px); }
        .fixed-title h3 { font-size: clamp(0.7rem, 2.2vw, 0.9rem); }
        .scrollable-content { top: clamp(50px, 15vw, 60px); left: clamp(16px, 5vw, 24px); right: clamp(16px, 5vw, 24px); bottom: clamp(30px, 8vw, 40px); }
        .scrollable-content p { font-size: clamp(0.8rem, 2.1vw, 1.07rem); line-height: 1.5; }
      }
      @media (max-width: 900px) {
        .mystery-card { width: clamp(240px, 85vw, 280px); height: clamp(210px, 80vw, 260px); border: clamp(6px, 1.8vw, 9px) solid; }
        .corner-dot { width: clamp(12px, 2.5vw, 16px); height: clamp(12px, 2.5vw, 16px); }
        .top-left { top: clamp(8px, 2vw, 13px); left: clamp(8px, 2vw, 13px); }
        .top-right { top: clamp(8px, 2vw, 13px); right: clamp(8px, 2vw, 13px); }
        .bottom-left { bottom: clamp(8px, 2vw, 13px); left: clamp(8px, 2vw, 13px); }
        .bottom-right { bottom: clamp(8px, 2vw, 13px); right: clamp(8px, 2vw, 13px); }
        .fixed-title h3 { font-size: clamp(0.65rem, 2vw, 1.07rem); }
        .fixed-title { top: clamp(8px, 2vw, 10px); }
        .scrollable-content { top: clamp(38px, 12vw, 42px); left: clamp(10px, 3vw, 12px); right: clamp(10px, 3vw, 12px); bottom: clamp(8px, 3vw, 12px); }
        .scrollable-content p { font-size: clamp(0.75rem, 1.8vw, 0.92rem); line-height: 1.3; }
      }
      @media (max-width: 600px) {
        .mystery-card { width: 100% !important; max-width: calc(100vw - 32px) !important; height: auto !important; min-height: 220px; border: clamp(6px, 2.5vw, 8px) solid !important; }
        .corner-dot { width: clamp(12px, 3vw, 16px); height: clamp(12px, 3vw, 16px); }
        .top-left { top: clamp(6px, 2vw, 12px); left: clamp(6px, 2vw, 12px); }
        .top-right { top: clamp(6px, 2vw, 12px); right: clamp(6px, 2vw, 12px); }
        .bottom-left { bottom: clamp(6px, 2vw, 12px); left: clamp(6px, 2vw, 12px); }
        .bottom-right { bottom: clamp(6px, 2vw, 12px); right: clamp(6px, 2vw, 12px); }
        .fixed-title h3 { font-size: clamp(0.6rem, 2.5vw, 1rem); letter-spacing: 0.5px; }
        .scrollable-content { top: clamp(50px, 15vw, 56px); left: clamp(12px, 4vw, 16px); right: clamp(12px, 4vw, 16px); bottom: clamp(35px, 10vw, 40px); }
        .scrollable-content p { font-size: clamp(0.7rem, 2vw, 0.86rem); line-height: 1.4; }
        .hover-question { font-size: clamp(2rem, 7vw, 3.5rem); letter-spacing: 1px; }
      }
      @media (max-width: 480px) {
        .mystery-card { min-height: 200px; }
        .fixed-title h3 { font-size: clamp(0.55rem, 2.2vw, 0.8rem); letter-spacing: 0px; }
        .scrollable-content p { font-size: clamp(0.65rem, 1.8vw, 0.75rem); }
        .hover-question { font-size: clamp(1.8rem, 6vw, 3rem); }
      }
    `}</style>
  </div>
);

// Star positions - scattered across the background
const STAR_COUNT = 7;
const STAR_POSITIONS = [
  { top: 12, left: 8 },      // Top left area
  { top: 10, left: 25 },     // Top center-left
  { top: 18, left: 42 },     // Top center
  { top: 14, left: 58 },     // Top center-right
  { top: 20, left: 72 },     // Top right area
  { top: 8, left: 85 },      // Top far right
  { top: 16, left: 95 },     // Top far right corner
].map(pos => ({
  ...pos,
  size: Math.random() * 2 + 3, // Size between 3-5px
}));

const AboutUsPage: React.FC = () => {
  // Adjusted clouds positions - higher starts and re-mixed cloud images
  const cloudPositions = [
    useCloudFloat({ baseTop: 130, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 440, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 655, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 730, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -10, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    document.documentElement.style.minHeight = "100vh";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.overflowY = "hidden";
  }, []);

  const lift = 80;

  return (
    <>
      <div
        className="page-container"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, #00040d 0%, #002855 100%)
          `,
          backgroundSize: "30px 30px, 30px 30px, 100% 100%",
          backgroundRepeat: "repeat, repeat, no-repeat",
          backgroundPosition: "top left, top left, center",
          userSelect: "none",
          touchAction: "none",
          overflow: "hidden",
          minHeight: "100vh",
          paddingBottom: "172px",
          position: "relative"
        }}
      >
        {/* Stars scattered across the background */}
        {STAR_POSITIONS.map((star, i) => (
          <Image
            key={`star-${i}`}
            src="/images/dot.png"
            alt=""
            width={star.size}
            height={star.size}
            style={{
              position: "absolute",
              top: `${star.top}vh`,
              left: `${star.left}vw`,
              zIndex: 1,
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.85,
            }}
          />
        ))}
        {/* Animated Clouds */}
        {cloudPositions.map((pos, i) => (
          <Image
            key={i}
            src={cloudImages[i % cloudImages.length]}
            alt={`Cloud ${i + 1}`}
            width={240}
            height={156}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              zIndex: 2,
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.98,
              transition: "top 0.18s linear"
            }}
            priority
          />
        ))}
        <div className="about-heading">
          <h1>About us</h1>
        </div>
        <div className="cards-container">
          <MysteryCard
            frameColor="#ffdd67"
            innerColor="#fff6de"
            dotColor="#8f6200"
            title="About MIC"
            desc="The MIC at VIT Chennai is a student-led tech community under the(MLSA) program. It's a space where students explore and innovate with technologies like AI, Azure, and GitHub. Whether you're a beginner or a builder, we offer an inclusive platform for collaboration, curiosity, and hands-on learning through real-world experiences."
            style={{ marginTop: 0 }}
          />
          <MysteryCard
            frameColor="#f7a8a8"
            innerColor="#ffe5ed"
            dotColor="#a13b48"
            title="What we do!"
            desc="We host hands-on workshops, speaker sessions, and hackathons focused on Microsoft technologies like Azure, Power Platform, and Copilot. These events help students build skills, explore emerging tech, and grow into confident, well-rounded tech leaders."
            style={{ marginTop: lift }}
          />
          <MysteryCard
            frameColor="#7faee3"
            innerColor="#d1f1ff"
            dotColor="#294771"
            title="What you get!"
            desc="We focus on leadership, teamwork, and communication alongside coding. Our club supports personal and professional growth, helping members build confidence and strong networks. No matter your background, you'll find a welcoming community that learns, creates, and grows together."
            style={{ marginTop: 0 }}
          />
        </div>
      </div>
      {/* Mario Footer */}
      <div className="mario-footer">
        <Image
          src="/images/Mario.png"
          alt="Mario Footer"
          width={1512}
          height={172}
          className="mario-footer-image"
          priority
        />
      </div>
      <style jsx>{`
        .page-container {
          position: relative;
          width: 100vw;
          max-width: 100vw;
          overflow: hidden;
        }
        .about-heading {
          position: relative;
          width: 90%;
          max-width: 650px;
          margin: clamp(60px, 12vw, 80px) auto clamp(24px, 6vw, 36px) auto;
          text-align: center;
          user-select: none;
          pointer-events: none;
        }
        .about-heading h1 {
          font-family: 'Press Start 2P', monospace;
          color: #fff;
          font-size: clamp(1.5rem, 5vw, 3.3rem);
          letter-spacing: clamp(1px, 0.5vw, 2px);
          text-shadow: 4px 4px 0 #000, 0 2px 8px #000;
          text-transform: capitalize;
          margin: 0;
          line-height: 1;
        }
        .cards-container {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: flex-start;
          gap: clamp(16px, 4vw, 32px);
          width: 100%;
          margin: 0 auto;
          padding: 0 clamp(8px, 3vw, 10px);
          overflow: visible;
        }
        .mario-footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100vw;
          height: clamp(120px, 15vh, 172px);
          pointer-events: none;
          user-select: none;
          z-index: 10;
          overflow: hidden;
        }
        :global(.mario-footer-image) {
          width: 100vw !important;
          height: clamp(120px, 15vh, 172px) !important;
          display: block !important;
          object-fit: cover !important;
          object-position: center !important;
          pointer-events: none !important;
          user-select: none !important;
        }
        
        /* Tablet Portrait - smaller tablets like iPad Mini, standard iPad */
        @media (min-width: 601px) and (max-width: 900px) and (orientation: portrait) {
          .mario-footer {
            height: clamp(80px, 8vh, 120px) !important;
          }
          :global(.mario-footer-image) {
            height: clamp(80px, 8vh, 120px) !important;
          }
          .page-container {
            padding-bottom: clamp(80px, 8vh, 120px) !important;
          }
        }
        
        /* Tablet Landscape - tablets in landscape orientation */
        @media (min-width: 901px) and (max-width: 1200px) and (orientation: landscape) {
          .mario-footer {
            height: clamp(90px, 12vh, 140px) !important;
          }
          :global(.mario-footer-image) {
            height: clamp(90px, 12vh, 140px) !important;
          }
          .page-container {
            padding-bottom: clamp(90px, 12vh, 140px) !important;
          }
        }
        
        /* Large Tablets - iPad Pro, Surface Pro */
        @media (min-width: 1024px) and (max-width: 1366px) {
          .mario-footer {
            height: clamp(100px, 10vh, 150px) !important;
          }
          :global(.mario-footer-image) {
            height: clamp(100px, 10vh, 150px) !important;
          }
          .page-container {
            padding-bottom: clamp(100px, 10vh, 150px) !important;
          }
        }
        
        /* Adjust page container padding for tablets */
        @media (min-width: 601px) and (max-width: 1366px) {
          .page-container {
            padding-bottom: clamp(80px, 10vh, 150px) !important;
            min-height: 100vh;
          }
        }

        @media (max-width: 900px) {
          .cards-container {
            gap: clamp(12px, 3vw, 28px);
          }
        }
        
        @media (max-width: 600px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
            gap: clamp(14px, 4vw, 18px);
            padding: 0 clamp(6px, 2vw, 10px);
          }
          .page-container {
            padding-bottom: clamp(120px, 15vh, 172px) !important;
          }
          .about-heading {
            margin: clamp(50px, 10vw, 80px) auto clamp(20px, 5vw, 36px) auto;
          }
        }

        @media (max-width: 480px) {
          .about-heading h1 {
            font-size: clamp(1.2rem, 4.5vw, 2rem);
            letter-spacing: clamp(0.5px, 0.3vw, 1px);
          }
          .cards-container {
            gap: clamp(12px, 3.5vw, 16px);
          }
        }
      `}</style>
    </>
  );
};

export default AboutUsPage;
