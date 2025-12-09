import { CloudImageProps, ControlType, TabType, TableRow, PodiumType } from './types';

export const MONO_FONT = "'Press Start 2P', monospace";
export const SANS_FONT = "'Press Start 2P', monospace";

export const ARCADE_WIDTH = 1508;
export const ARCADE_HEIGHT = 982;

// Use original pixel-based positioning
export const SCREEN = {
  left: 150, // Shifted right from 120
  top: 140,
  width: 1250, // Adjusted width to maintain proper fit
  height: 600,
};

export const CONTROLS: ControlType[] = [
  { type: 'joystick', left: 357, top: 690, label: 'FFCS', key: 'ffcs' }, // Adjusted position
  { type: 'button', left: 762, top: 725, label: 'ALL PLAYERS', key: 'all' },
  { type: 'joystick', left: 1167, top: 690, label: 'NON-FFCS', key: 'nonffcs' }, // Adjusted position
];

export const PODIUM = {
  left: 320,
  top: 260,
  width: 630,
  height: 220,
};

export const PODIUM_STEPS = [
  { cx: 120, cy: 60 },
  { cx: 315, cy: -20 },
  { cx: 500, cy: 90 },
];

export const ghostImages = [
  '/yellowghost.png',
  '/greenghost.png',
  '/blueghost.png',
];

// Example table data
export const mockTable: TableRow[] = [
  { name: 'Ada Lovelace', xp: 1234, tag: 'PRO', id: '24BEX123', dept: 'UI/UX' },
  { name: 'Alan Turing', xp: 1111, tag: 'PRO', id: '24BEX124', dept: 'UI/UX' },
  { name: 'Grace Hopper', xp: 1100, tag: 'PRO', id: '24BEX125', dept: 'AI/ML' },
  { name: 'Claude Shannon', xp: 950, tag: 'PRO', id: '24BEX126', dept: 'CS' },
  { name: 'Margaret Hamilton', xp: 900, tag: 'PRO', id: '24BEX127', dept: 'SE' },
  { name: 'John von Neumann', xp: 850, tag: 'PRO', id: '24BEX128', dept: 'MATH' },
  { name: 'Katherine Johnson', xp: 800, tag: 'PRO', id: '24BEX129', dept: 'NASA' },
];

export const mockPodium: PodiumType[] = [
  { name: 'Ada Lovelace', xp: 4000, ghost: ghostImages[0] },
  { name: 'Alan Turing', xp: 3800, ghost: ghostImages[1] },
  { name: 'Grace Hopper', xp: 3700, ghost: ghostImages[2] }
];

export const tabs: TabType[] = [
  { label: 'FFCS', key: 'ffcs' },
  { label: 'ALL PLAYERS', key: 'all' },
  { label: 'NON-FFCS', key: 'nonffcs' },
];

// Static cloud configuration (fixed array length)
export const STATIC_CLOUDS: Omit<CloudImageProps, 'baseLeft'>[] = [
  { src: '/images/cloud1.png', width: 320, height: 170, baseTop: 60, amplitude: 14, speed: 0.82, phase: 0 },
  { src: '/images/cloud2.png', width: 340, height: 170, baseTop: 480, amplitude: 28, speed: 1.21, phase: 1 },
  { src: '/images/cloud2.png', width: 340, height: 170, baseTop: 150, amplitude: 22, speed: 1.03, phase: 2 },
  { src: '/images/cloud3.png', width: 240, height: 125, baseTop: 760, amplitude: 18, speed: 1.2, phase: 3 },
  { src: '/images/cloud3.png', width: 240, height: 125, baseTop: 640, amplitude: 16, speed: 1.0, phase: 4 },
  { src: '/images/cloud1.png', width: 324, height: 170, baseTop: -13, amplitude: 20, speed: 0.97, phase: 5 },
  { src: '/images/cloud2.png', width: 300, height: 160, baseTop: 40, amplitude: 12, speed: 0.9, phase: 6 },
  { src: '/images/cloud1.png', width: 280, height: 150, baseTop: 220, amplitude: 18, speed: 1.05, phase: 7 },
  { src: '/images/cloud3.png', width: 200, height: 110, baseTop: 320, amplitude: 10, speed: 1.3, phase: 8 },
  { src: '/images/cloud1.png', width: 340, height: 170, baseTop: 520, amplitude: 24, speed: 0.88, phase: 9 },
  { src: '/images/cloud2.png', width: 260, height: 140, baseTop: 420, amplitude: 15, speed: 1.15, phase: 10 },
  { src: '/images/cloud3.png', width: 220, height: 120, baseTop: 80, amplitude: 13, speed: 1.0, phase: 11 },
];

export function getThemeColors(isDarkMode: boolean) {
  if (isDarkMode) {
    return {
      background: 'linear-gradient(to bottom, #00040d 0%, #002855 100%)',
      gridOpacity: 'rgba(255, 255, 255, 0.1)',
      textColor: 'text-white',
      lineColor: '#0B3A79',
      borderColor: '#1e40af',
    };
  } else {
    return {
      background: 'linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)',
      gridOpacity: 'rgba(255, 255, 255, 0.3)',
      textColor: 'text-gray-900',
      lineColor: '#1e88e5',
      borderColor: '#3b82f6',
    };
  }
} 