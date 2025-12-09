import { useState, useEffect, useRef } from 'react';
import { CloudProps } from '../app/leaderboard/_components/types';

export function useCloudFloat({
  baseTop,
  baseLeft,
  amplitude = 30,
  speed = 1,
  phase = 0,
}: CloudProps) {
  const [top, setTop] = useState(baseTop);
  const lastRef = useRef<number | null>(null);
  const phaseAcc = useRef<number>(phase);

  useEffect(() => {
    phaseAcc.current = phase;
    lastRef.current = null;

    let running = true;
    function animate(now: number) {
      if (!running) return;
      if (lastRef.current == null) {
        lastRef.current = now;
      }
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;

      phaseAcc.current += dt * speed;

      const newTop = Number(baseTop) + Math.sin(phaseAcc.current) * amplitude;
      const clampedTop = Math.max(-100, Math.min(window.innerHeight - 50, newTop));
      setTop(clampedTop);

      requestAnimationFrame(animate);
    }

    const id = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(id);
      lastRef.current = null;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
} 