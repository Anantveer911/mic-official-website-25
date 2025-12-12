import React from 'react';
import Image from 'next/image';
import { CONTROLS } from './constants';

interface ArcadeControlsProps {
  tab: string;
  onTabChange: (tab: string) => void;
}

export function ArcadeControls({ tab, onTabChange }: ArcadeControlsProps) {
  return (
    <>
      <style>
        {`
          /* 3D Button Animation */
          .arcade-button-press {
            transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: bottom center;
            clip-path: inset(0 0 0 0); 
          }
          
          .arcade-button-press:active {
            /* 3D Press Effect: Down + Crop */
            transform: translateY(6px);
            clip-path: inset(0 0 6px 0);
          }
        `}
      </style>

      {CONTROLS.map((ctrl, i) => {
        const isActive = tab === ctrl.key;
        const isCenterButton = ctrl.type === 'button';

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: ctrl.left,
              top: ctrl.top,
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => onTabChange(ctrl.key)}
              className={isCenterButton ? "arcade-button-press" : ""}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                outline: 'none',
                cursor: 'pointer',
              }}
              aria-label={ctrl.label}
            >
              <Image
                src={
                  ctrl.type === 'joystick' 
                    ? (isActive ? '/images/joystick-selected.png' : '/images/arcade-joystick.png')
                    : '/images/arcade-button.png'
                }
                alt={ctrl.type}
                width={ctrl.type === 'joystick' ? 60 : 56}
                height={ctrl.type === 'joystick' ? 60 : 56}
                style={{
                  display: 'block',
                  transition: 'filter 0.2s ease',
                  
                  // FIXED LOGIC:
                  // 1. Removed 'drop-shadow' (which caused the red square).
                  // 2. Added 'brightness(1.2)' to make it look lit up.
                  // 3. Added 'sepia(1) hue-rotate(-50deg)' to tint it RED without leaving the circle boundaries.
                  filter: (isActive && isCenterButton) 
                    ? 'brightness(1.2) sepia(0.5) hue-rotate(-30deg)' 
                    : 'none'
                }}
              />
            </button>
          </div>
        );
      })}
    </>
  );
}