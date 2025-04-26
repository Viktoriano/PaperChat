"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from 'next/navigation';

const DotGridWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #232233;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const RINGS = [
  { radius: 90, width: 2, speed: 0.7, scaleRange: [1, 1.18], color: 'rgba(59,124,255,0.28)' },
  { radius: 60, width: 3, speed: -1, scaleRange: [1, 1.13], color: 'rgba(59,124,255,0.40)' },
  { radius: 36, width: 2, speed: 1.4, scaleRange: [1, 1.08], color: 'rgba(59,124,255,0.32)' },
];
const STAR_POINTS = 8;
const STAR_RADIUS = 28;
const DURATION = 8160;
const DOTS_PER_BURST = 7;
const DOT_BURST_INTERVAL = 680; // ms
const DOT_LIFETIME = 1200; // ms

function useGlobalAnim(duration: number) {
  const [now, setNow] = React.useState(() => performance.now());
  React.useEffect(() => {
    let frame: number;
    function loop() {
      setNow(performance.now());
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [duration]);
  return ((now % duration) / duration);
}

function useAnimatedDots() {
  const [dots, setDots] = React.useState([]);
  React.useEffect(() => {
    let running = true;
    function emitBurst() {
      setDots(ds => [
        ...ds,
        ...Array.from({length: DOTS_PER_BURST}).map((_, i) => ({
          key: `${Date.now()}-${i}-${Math.random()}`,
          angle: (2 * Math.PI * i) / DOTS_PER_BURST + Math.random() * 0.2,
          start: performance.now(),
        }))
      ]);
      if (running) setTimeout(emitBurst, DOT_BURST_INTERVAL);
    }
    emitBurst();
    return () => { running = false; };
  }, []);
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDots(ds => ds.filter(dot => performance.now() - dot.start < DOT_LIFETIME));
    });
    return () => cancelAnimationFrame(frame);
  });
  return dots;
}

function starPath(cx: number, cy: number, r: number, points: number) {
  const step = Math.PI / points;
  let path = '';
  for (let i = 0; i < 2 * points; i++) {
    const angle = i * step - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.44;
    const x = cx + rad * Math.cos(angle);
    const y = cy + rad * Math.sin(angle);
    path += i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }
  return path + 'Z';
}

export default function SplashScreen() {
  const t = useGlobalAnim(DURATION);
  const dots = useAnimatedDots();
  // Center of SVG
  const cx = 110, cy = 110;
  return (
    <DotGridWrapper data-testid="splash-page" style={{alignItems:'center',justifyContent:'center'}}>
      <svg width={220} height={220} style={{display:'block'}}>
        {/* Animated Rings */}
        {RINGS.map((ring, i) => {
          const rot = 360 * ring.speed * t;
          const scale = ring.scaleRange[0] + (ring.scaleRange[1] - ring.scaleRange[0]) * (0.5 + 0.5 * Math.sin(2*Math.PI*t + i));
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={ring.radius * scale}
              fill="none"
              stroke={ring.color}
              strokeWidth={ring.width}
              style={{
                transform: `rotate(${rot}deg)`,
                transformOrigin: `${cx}px ${cy}px`,
                transition: 'none',
              }}
            />
          );
        })}
        {/* Central Star */}
        <path
          d={starPath(cx, cy, STAR_RADIUS * (1.05 + 0.09 * Math.sin(2*Math.PI*t)), STAR_POINTS)}
          fill="#3b7cff"
          style={{
            filter: 'drop-shadow(0 0 12px #3b7cff88)',
            transform: `rotate(${t*360*0.6}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
            transition: 'none',
          }}
        />
        {/* Fading Dots */}
        {dots.map(dot => {
          const frac = Math.min(1, (performance.now() - dot.start) / DOT_LIFETIME);
          const r = 32 + 76 * frac;
          const x = cx + r * Math.cos(dot.angle);
          const y = cy + r * Math.sin(dot.angle);
          return (
            <circle
              key={dot.key}
              cx={x}
              cy={y}
              r={4 + 2 * (1-frac)}
              fill="#3b7cff"
              opacity={1 - frac}
              style={{ filter: 'blur(0.5px)' }}
            />
          );
        })}
      </svg>
    </DotGridWrapper>
  );
}
