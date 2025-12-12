'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface NavItem {
    name: string;
    color: string;
    id: string;
    href: string;
}

interface Cube3DProps {
    color: string;
}

const CubeNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Navigation items with cube colors
    const navItems: NavItem[] = [
        { name: 'Home', color: '#FF69B4', id: 'home', href: '/main' },
        { name: 'About Us', color: '#90EE90', id: 'about', href: '/about-us' },
        { name: 'Board', color: '#87CEEB', id: 'board', href: '/leads' },
        { name: 'Gallery', color: '#DDA0DD', id: 'gallery', href: '/gallery' },
        { name: 'Events', color: '#F0E68C', id: 'events', href: '/events' },
        { name: 'Projects', color: '#20B2AA', id: 'projects', href: '/projects' },
        { name: 'Leaderboard', color: '#F5DEB3', id: 'leaderboard', href: '/leaderboard' },
    ];

    // Toggle button when navbar is closed
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-4 z-[2000] "
            >
                <Image
                    src="/nav_menu.svg"
                    alt="Close Menu"
                    width={40}
                    height={40}
                    className="block"
                />
            </button>
        );
    }

    return (
        <div className="fixed bottom-10 right-4 z-[2000] w-90  ">

            <Image
                src="/navbar_background.svg"
                alt="Navbar Background"
                width={220}
                height={220}
                className="absolute inset-0 object-cover"
            />

            {/* Close button */}
            <button
                onClick={() => setIsOpen(false)}
                className="absolute -bottom-1   right-5 z-10 "
            >
                <Image
                    src="/close_button.svg"
                    alt="Close Menu"
                    width={35}
                    height={35}
                    className="block"
                />
            </button>

            {/* Navigation content */}
            <div className="relative z-5 pt-4 pb-6 px-3 ">
                <nav className="font-press-start space-y-1 max-h-96 overflow-y-auto pb-5 ">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className="flex items-center py-2 px-2 text-black text-xs hover:bg-white/20 rounded-lg transition-all duration-200 group cursor-pointer"
                        >
                            <Image
                                src={`/cube/${item.id}.svg`}
                                alt={`${item.name} Cube`}
                                width={24}
                                height={24}
                                className="mr-2 transition-transform duration-300 "
                                style={{ filter: `drop-shadow(0 0 5px ${item.color})` }}
                            />
                            <span
                                className="select-none"
                            >
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