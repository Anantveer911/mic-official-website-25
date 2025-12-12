import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface YearButtonProps {
  selectedTenure: string | null;
  onTenureChange: (tenure: string) => void;
}

const YearButton: React.FC<YearButtonProps> = ({ selectedTenure, onTenureChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const tenures = [
    { label: '2025-2026', value: '2025-2026' },
    { label: '2024-2025', value: '2024-2025' },
    { label: '2023-2024', value: '2023-2024' },
  ];

  const handleTenureClick = (tenure: string) => {
    onTenureChange(tenure);
    setIsOpen(false);
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block z-20 w-full" ref={ref}>
      {/* Main Button */}
      <button
        className="relative flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none cursor-pointer w-full"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ 
          outline: 'none',
          height: 'auto',
          minHeight: '50px',
          maxWidth: '1100px',
        }}  
      >
        <Image
          src="/images/tenure.png"
          alt="Select Tenure"
          width={296}
          height={74}
          className="w-full h-auto"
          style={{ display: 'block' }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full z-30">
          <div className="relative w-full">
            <Image
              src="/images/tenure-dd.png"
              alt="Tenure Dropdown"
              width={296}
              height={222}
              className="w-full h-auto"
              style={{ display: 'block' }}
            />
            {tenures.map((tenure, index) => (
              <div
                key={tenure.value}
                className="absolute cursor-pointer transition-all duration-200 flex items-center justify-center font-press-start text-[#6B3E11]"
                onClick={() => handleTenureClick(tenure.value)}
                style={{
                  top: `${9.5 + index * 29}%`,
                  left: '4.8%',
                  width: '90.4%',
                  height: '27.8%',
                  backgroundColor: 'transparent',
                  fontSize: 'clamp(8px, 1.5vw, 14px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(107, 224, 208, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {tenure.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearButton;