'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface NavItem {
  name: string;
  color: string;
  id: string;
  href: string;
}

const CubeNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    { name: 'Home', color: '#FF69B4', id: 'home', href: '/main' },
    { name: 'About Us', color: '#90EE90', id: 'about', href: '/about-us' },
    { name: 'Board', color: '#87CEEB', id: 'board', href: '/leads' },
    { name: 'Gallery', color: '#DDA0DD', id: 'gallery', href: '/gallery' },
    { name: 'Events', color: '#F0E68C', id: 'events', href: '/events' },
    { name: 'Projects', color: '#20B2AA', id: 'projects', href: '/projects' },
    { name: 'Leaderboard', color: '#F5DEB3', id: 'leaderboard', href: '/leaderboard' },
  ];

  // Close on outside click and on Escape
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (isOpen && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // small compact toggle button when closed
  if (!isOpen) {
    return (
      <button
        aria-label="Open navigation"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-4 z-[60] rounded-full p-1 bg-white/90 dark:bg-black/75 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
      >
        <Image src="/nav_menu.svg" alt="Open Menu" width={40} height={40} />
      </button>
    );
  }

  return (
    <div
      ref={rootRef}
      className="fixed bottom-10 right-4 z-[60] w-56 max-w-[90vw] rounded-2xl overflow-hidden"
      aria-expanded={isOpen}
      role="dialog"
      aria-label="Navigation menu"
    >
      {/* Decorative background image (keeps as background but doesn't cover nav content) */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/navbar_background.svg"
          alt=""
          fill
          className="object-cover opacity-30 dark:opacity-40"
          style={{ objectPosition: 'center' }}
        />
      </div>

      {/* Panel with blur + improved contrast */}
      <div className="relative p-3 pt-4 pb-6 bg-white/80 dark:bg-black/65 backdrop-blur-md border border-white/40 dark:border-black/40 shadow-xl">
        {/* Close */}
        <button
  onClick={() => setIsOpen(false)}
  aria-label="Close navigation"
  className="absolute top-2 right-2 z-20 rounded-full p-1 bg-white/90 dark:bg-black/80 shadow-md 
             w-9 h-9 flex items-center justify-center
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
>
  <Image
    src="/close_button.svg"
    alt="Close"
    width={30}
    height={30}
    className="object-contain"
  />
</button>

       

        <nav className="font-press-start space-y-2 max-h-72 overflow-y-auto pr-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 py-2 px-2 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              // light / dark link background hover + text color for contrast
              // text-black for light, text-white for dark
              // hover: slightly more opaque highlight
              aria-label={item.name}
            >
              <Image
                src={`/cube/${item.id}.svg`}
                alt={`${item.name} Cube`}
                width={24}
                height={24}
                className="flex-shrink-0"
                style={{
                  filter: `drop-shadow(0 0 6px ${item.color})`,
                }}
              />
              <span className="text-[11px] text-black dark:text-white/95 select-none">
                {item.name}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CubeNavbar;
