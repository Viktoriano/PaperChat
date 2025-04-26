'use client';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const DotGridBG = styled.canvas`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
`;

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    const dotSpacing = 20;
    const dotSize = 2;
    // Add more dots for larger screens: use a multiplier for larger screens
    let densityMultiplier = 1;
    if (width > 1200) densityMultiplier = 1.5;
    if (width > 1800) densityMultiplier = 2;
    const rows = Math.floor((height / dotSpacing) * densityMultiplier);
    const cols = Math.floor((width / dotSpacing) * densityMultiplier);
    let animDots: {i:number; j:number; phase:number; target:number;}[] = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        animDots.push({i, j, phase: Math.random() * 0.2, target: 0});
      }
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const d of animDots) {
        ctx.beginPath();
        ctx.arc(
          (d.j + 0.5) * (width / cols),
          (d.i + 0.5) * (height / rows),
          dotSize, 0, 2 * Math.PI
        );
        const alpha = d.phase;
        ctx.fillStyle = `rgba(44, 56, 81, ${alpha})`;
        ctx.fill();
      }
    }
    function animate() {
      for (const d of animDots) {
        // Slightly faster illumination
        if (Math.random() < 0.00004) d.target = d.target === 1 ? 0 : 1;
        // Progressively animate phase toward target
        if (d.target === 1 && d.phase < 1) d.phase += 0.015;
        if (d.target === 0 && d.phase > 0.2) d.phase -= 0.015;
        d.phase = Math.max(0.2, Math.min(1, d.phase));
      }
      draw();
      requestAnimationFrame(animate);
    }
    draw();
    animate();
    // Redraw on resize
    const handleResize = () => window.location.reload();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return <DotGridBG ref={canvasRef} />;
}
