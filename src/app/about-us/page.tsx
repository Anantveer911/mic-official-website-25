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
    <style jsx>{`
      .mystery-card {
        width: 320px;
        height: 290px;
        border: 10px solid;
        il: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        opacity: 1;
        cursor: default;
        transition: all 0.3s ease;
        box-shadow: 0 0 0 4px var(--dot-color-transparent, #00000050);
        overflow: hidden;
        background-clip: padding-box;
        margin: 0;
        flex: 0 0 auto;
      }
      .inner-panel {
        position: absolute;
        left: 5px; top: 5px; right: 5px; bottom: 5px;
        border-radius: 0;
        z-index: 8;
      }
      .corner-dot {
        width: 22px; height: 22px; border-radius: 0;
        position: absolute; z-index: 3;
      }
      .top-left { top: 28px; left: 28px;}
      .top-right { top: 28px; right: 28px;}
      .bottom-left { bottom: 28px; left: 28px;}
      .bottom-right { bottom: 28px; right: 28px;}
      .fixed-title {
        position: absolute; top: 22px; left: 0; right: 0;
        text-align: center; z-index: 25; pointer-events: none;
        opacity: 0; transition: opacity 0.3s ease;
      }
      .fixed-title h3 {
        font-family: "Press Start 2P", monospace; font-weight: 700;
        font-size: 1.25rem; text-transform: capitalize;
        text-shadow: 2px 2px 0 #fff, 4px 4px 0 #000; margin: 0; letter-spacing: 1px;
      }
      .scrollable-content {
        position: absolute; top: 72px; left: 24px; right: 24px; bottom: 24px;
        z-index: 25; overflow-y: auto; pointer-events: auto; scrollbar-width: none; -ms-overflow-style: none;
        opacity: 0; transition: opacity 0.3s ease;
      }
      .scrollable-content::-webkit-scrollbar { display: none; }
      .scrollable-content p {
        font-family: "IBM Plex Mono", monospace; font-size: 1.07rem; color: #444; line-height: 1.62; margin: 0; text-align: center;
      }
      .hover-question {
        position: absolute; inset: 0; display: flex; justify-content: center; align-items: center;
        font-size: 4.2rem; font-weight: 900; font-family: "Press Start 2P", monospace;
        letter-spacing: 2px; user-select: none; margin-top: 10px; transition: opacity 0.3s ease; z-index: 20;
        pointer-events: none; opacity: 1;
      }
      .group:hover .hover-question { opacity: 0; }
      .group:hover .fixed-title { opacity: 1; }
      .group:hover .scrollable-content { opacity: 1; }
      @media (max-width: 900px) {
        .mystery-card { width: 245px; height: 205px;}
        .corner-dot { width: 16px; height: 16px;}
        .top-left { top: 13px; left: 13px;}
        .top-right { top: 13px; right: 13px;}
        .bottom-left { bottom: 13px; left: 13px;}
        .bottom-right { bottom: 13px; right: 13px;}
        .fixed-title h3 { font-size: 1.07rem;}
        .fixed-title { top: 10px;}
        .scrollable-content { top: 42px; left: 12px; right: 12px; bottom: 12px;}
        .scrollable-content p { font-size: 0.92rem; line-height: 1.24;}
      }
      @media (max-width: 600px) {
        .cards-container {flex-direction: column; align-items: center; gap: 18px;}
        .mystery-card { width: 100% !important; max-width: 320px !important; height: auto !important;}
        .fixed-title h3 { font-size: 1rem;}
        .scrollable-content { top: 56px;}
        .scrollable-content p { font-size: 0.86rem;}
      }
    `}</style>
  </div>
);

// Star positions - scattered across the background
const STAR_COUNT = 80;
const STAR_POSITIONS = Array.from({ length: STAR_COUNT }).map((_, i) => ({
  top: Math.floor((i * 137) % 95) + Math.floor(i * 23) % 5, // percentage values (vh)
  left: Math.floor((i * 241) % 98) + Math.floor(i * 19) % 3, // percentage values (vw)
  size: Math.random() * 3 + 4, // Size between 4-7px
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

  const lift = 36;

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
              opacity: 0.9,
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
            style={{ marginTop: lift }}
          />
          <MysteryCard
            frameColor="#f7a8a8"
            innerColor="#ffe5ed"
            dotColor="#a13b48"
            title="What we do!"
            desc="We host hands-on workshops, speaker sessions, and hackathons focused on Microsoft technologies like Azure, Power Platform, and Copilot. These events help students build skills, explore emerging tech, and grow into confident, well-rounded tech leaders."
            style={{ marginTop: 0 }}
          />
          <MysteryCard
            frameColor="#7faee3"
            innerColor="#d1f1ff"
            dotColor="#294771"
            title="What you get!"
            desc="We focus on leadership, teamwork, and communication alongside coding. Our club supports personal and professional growth, helping members build confidence and strong networks. No matter your background, you'll find a welcoming community that learns, creates, and grows together."
            style={{ marginTop: lift }}
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
          margin: 110px auto 36px auto;
          text-align: center;
          user-select: none;
          pointer-events: none;
        }
        .about-heading h1 {
          font-family: 'Press Start 2P', monospace;
          color: #fff;
          font-size: clamp(2.1rem, 6vw, 3.3rem);
          letter-spacing: 2px;
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
          align-items: flex-end;
          gap: 32px;
          width: 100%;
          margin: 0 auto;
          padding: 0 10px;
          overflow: visible;
        }
        .mario-footer {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100vw;
          height: 172px;
          pointer-events: none;
          user-select: none;
          z-index: 10;
          overflow: hidden;
        }
        :global(.mario-footer-image) {
          width: 100vw !important;
          height: 172px !important;
          display: block !important;
          object-fit: cover !important;
          object-position: center !important;
          pointer-events: none !important;
          user-select: none !important;
        }
        
        /* Tablet Portrait - smaller tablets like iPad Mini, standard iPad */
        @media (min-width: 601px) and (max-width: 900px) and (orientation: portrait) {
          .mario-footer {
            height: 8vh !important;
            min-height: 80px !important;
            max-height: 120px !important;
          }
          :global(.mario-footer-image) {
            height: 8vh !important;
            min-height: 80px !important;
            max-height: 120px !important;
          }
        }
        
        /* Tablet Landscape - tablets in landscape orientation */
        @media (min-width: 901px) and (max-width: 1200px) and (orientation: landscape) {
          .mario-footer {
            height: 12vh !important;
            min-height: 90px !important;
            max-height: 140px !important;
          }
          :global(.mario-footer-image) {
            height: 12vh !important;
            min-height: 90px !important;
            max-height: 140px !important;
          }
        }
        
        /* Large Tablets - iPad Pro, Surface Pro */
        @media (min-width: 1024px) and (max-width: 1366px) {
          .mario-footer {
            height: 10vh !important;
            min-height: 100px !important;
            max-height: 150px !important;
          }
          :global(.mario-footer-image) {
            height: 10vh !important;
            min-height: 100px !important;
            max-height: 150px !important;
          }
        }
        
        /* Adjust page container padding for tablets */
        @media (min-width: 601px) and (max-width: 1366px) {
          .page-container {
            padding-bottom: 10vh !important;
            min-height: 100vh;
          }
        }

        @media (max-width: 900px) {
          .cards-container .mystery-card {
            width: 250px !important;
            height: 205px !important;
          }
        }
        @media (max-width: 600px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
            gap: 18px;
          }
          .mystery-card {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
          }
          .page-container {
            padding-bottom: 172px !important;
          }
        }
      `}</style>
    </>
  );
};

export default AboutUsPage;
