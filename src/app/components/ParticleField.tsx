import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  connections: number[];
}

interface NetworkNode {
  x: number;
  y: number;
  pulsePhase: number;
  connections: string[];
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const networkNodesRef = useRef<NetworkNode[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Animation disabled - no moving particles on background
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ background: 'transparent' }}
    />
  );
}
