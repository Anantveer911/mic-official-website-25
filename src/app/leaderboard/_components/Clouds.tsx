import React, { useMemo } from 'react';
import { CloudImageProps } from './types';
import { STATIC_CLOUDS, SCREEN } from './constants';
import { CloudComponent } from './Cloud';
import { useViewportSize } from '@/hooks/useViewportSize';

export function Clouds() {
  const viewportSize = useViewportSize();

  const clouds = useMemo(() => {
    if (viewportSize.width === 0) return STATIC_CLOUDS.map((cloud, index) => ({ ...cloud, baseLeft: 120 }));
    const count = STATIC_CLOUDS.length;
    const screenCenterX = SCREEN.left + SCREEN.width / 2;
    const spread = Math.max(SCREEN.width * 0.65, viewportSize.width * 0.5);

    return STATIC_CLOUDS.map((cloud, index) => {
      const t = count > 1 ? index / (count - 1) : 0.5;
      let anchorNormalized = t * 2 - 1;

      const jitter = Math.sin(index * 2.17) * 0.06;
      anchorNormalized += jitter;

      const desiredCenter = screenCenterX + anchorNormalized * spread;
      const left = Math.round(desiredCenter - (cloud.width || 0) / 2);
      const clampedLeft = Math.max(-Math.floor((cloud.width || 0) * 0.3), Math.min(viewportSize.width - Math.ceil((cloud.width || 0) * 0.7), left));

      return {
        ...cloud,
        baseLeft: clampedLeft,
        baseTop: index === 3 ? Math.min(760, viewportSize.height - 125) :
                 index === 4 ? Math.min(640, viewportSize.height - 200) :
                 index === 5 ? Math.max(-13, -50) :
                 cloud.baseTop,
      };
    });
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