import React, { useMemo } from 'react';
import { STATIC_CLOUDS } from './constants';
import { CloudComponent } from './Cloud';
import { useViewportSize } from '@/hooks/useViewportSize';

export function Clouds() {
  const viewportSize = useViewportSize();

  // Memoized clouds with responsive positioning
  const clouds = useMemo(() => {
    if (viewportSize.width === 0) return STATIC_CLOUDS.map((cloud) => ({ ...cloud, baseLeft: 0 }));
    
    // UPDATED: Shifted coordinates LEFT to match the global site layout
    const baseLeftPositions = [
      -40,  // Was 120 (Shifted left to start at edge)
      -20,  // Was 55 (Shifted left)
      Math.max(1000, viewportSize.width - 390), // Right side clouds
      150,  // Was 333 (Shifted left)
      Math.max(1050, viewportSize.width - 280),
      Math.max(1100, viewportSize.width - 374),
    ];

    return STATIC_CLOUDS.map((cloud, index) => ({
      ...cloud,
      // Apply the new left positions
      baseLeft: baseLeftPositions[index] ?? 0,
      
      // Keep the existing responsive top logic
      baseTop: index === 3 ? Math.min(760, viewportSize.height - 125) :
               index === 4 ? Math.min(640, viewportSize.height - 200) :
               index === 5 ? Math.max(-13, -50) :
               cloud.baseTop,
    }));
  }, [viewportSize.width, viewportSize.height]);

  return (
    <>
      {clouds.map((cloud, i) => (
        <CloudComponent 
          key={i} 
          cloud={cloud} 
          viewportSize={viewportSize}
        />
      ))}
    </>
  );
}