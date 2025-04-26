'use client';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 375px;
  height: 812px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url('/Conversation_Background.png'), #FFFFFF;
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 12px 50px;
  gap: 32px;
  width: 375px;
  height: 812px;
  backdrop-filter: blur(16px);
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 351px;
  height: 152.4px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  gap: 10px;
  width: 112.4px;
  height: 112.4px;
  background: rgba(44, 56, 81, 0.16);
  border-radius: 100px;
`;

const AvatarImg = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 104.4px;
  height: 104.4px;
  background: url('/arctic-monkeys.jpg');
  background-size: cover;
  border-radius: 90px;
`;

const NameRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 351px;
  height: 24px;
`;

const UserName = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #2C3851;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
`;

const VerifiedIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url('/verified.svg');
  background-size: cover;
  margin-left: 4px;
`;

const QRSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 358px;
  height: 403px;
`;

const QRFrame = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  gap: 10px;
  width: 312px;
  height: 377px;
  background: rgba(44, 56, 81, 0.08);
  border: 1px solid rgba(44, 56, 81, 0.16);
  border-radius: 24px;
  perspective: 800px;
`;

const QRInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 24px;
  width: 304px;
  height: 369px;
  background: rgba(44, 56, 81, 0.64);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  transition: transform 0.2s cubic-bezier(.22,1,.36,1);
`;

const QRTitle = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: -0.02em;
  text-align: center;
`;

const QRCodeGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  width: 240px;
  height: 240px;
  position: relative;
`;

const QRCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

interface QRDotProps {
  opacity: number;
}

const QRDot = styled.div<QRDotProps>`
  width: 18px;
  height: 18px;
  border-radius: 100px;
  background: #FFF;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.2s;
`;

const QRLogo = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 56px;
  height: 56px;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(44,56,81,0.12);
  background: #FFF;
  z-index: 2;
`;

const QRRefresh = styled.div`
  margin-top: 16px;
  width: 24px;
  height: 24px;
  background: url('/refresh.svg');
  background-size: cover;
  cursor: pointer;
`;

const QRHint = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #D1D6E0;
  margin-top: 8px;
  text-align: center;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: rgba(16,30,58,0.16);
  backdrop-filter: blur(16px);
  border: none;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.2s, opacity 0.2s;
  opacity: 0.48;
  &:hover {
    opacity: 0.64;
  }
  &:active {
    opacity: 1;
  }
  &:focus {
    box-shadow: 0 0 0 2px #101E3A;
    outline: none;
    z-index: 2;
  }
`;

const CloseIcon = styled.span`
  width: 24px;
  height: 24px;
  display: inline-block;
  background: url('/close.svg');
  background-size: cover;
  opacity: 1;
`;

function generateQRGrid(seed: string, size = 12) {
  // Use a seeded random for unique user QR
  let s = 0;
  for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i);
  const rand = () => {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  };
  const grid = Array(size).fill(0).map(() => Array(size).fill(0));
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      // Center logo area
      if (x >= 4 && x < 8 && y >= 4 && y < 8) {
        grid[x][y] = null;
      } else {
        // 25% chance of 0 opacity, otherwise random between 0.2 and 1
        const r = rand();
        grid[x][y] = r < 0.25 ? 0 : 0.2 + rand() * 0.8;
      }
    }
  }
  return grid;
}

export default function UserQRCodePage() {
  const [qrSeed, setQrSeed] = useState('Viktor');
  const [qrGrid, setQrGrid] = useState(() => generateQRGrid('Viktor'));
  const qrRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({x: 0, y: 0});

  // Gyroscope effect
  useEffect(() => {
    const handle = (e: DeviceOrientationEvent) => {
      const x = Math.max(-20, Math.min(20, e.beta || 0));
      const y = Math.max(-20, Math.min(20, e.gamma || 0));
      setTilt({x, y});
    };
    window.addEventListener('deviceorientation', handle);
    return () => window.removeEventListener('deviceorientation', handle);
  }, []);

  // Mouse tilt effect
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!qrRef.current) return;
      const rect = qrRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (mx >= 0 && mx <= rect.width && my >= 0 && my <= rect.height) {
        // Centered at (rect.width/2, rect.height/2)
        const dx = (mx - rect.width/2) / (rect.width/2);
        const dy = (my - rect.height/2) / (rect.height/2);
        setTilt({ x: dy * 20, y: -dx * 20 });
      }
    };
    const handleLeave = () => setTilt({x: 0, y: 0});
    window.addEventListener('mousemove', handleMouse);
    if (qrRef.current) qrRef.current.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (qrRef.current) qrRef.current.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  // Refresh QR
  const refreshQR = () => {
    const newSeed = Math.random().toString(36).substring(2);
    setQrSeed(newSeed);
    setQrGrid(generateQRGrid(newSeed));
  };

  return (
    <Background>
      <Overlay>
        <ProfileSection>
          <AvatarWrapper>
            <AvatarImg />
          </AvatarWrapper>
          <NameRow>
            <UserName>Viktor</UserName>
            <VerifiedIcon />
          </NameRow>
        </ProfileSection>
        <QRSection>
          <QRFrame>
            <QRInner
              ref={qrRef}
              style={{
                transform: `rotateX(${-tilt.x/3}deg) rotateY(${-tilt.y/3}deg)`
              }}
            >
              <QRTitle>Scan QR code</QRTitle>
              <QRCodeGrid>
                {qrGrid.map((col, i) => (
                  <QRCol key={i}>
                    {col.map((opacity, j) =>
                      opacity === null ? (
                        i === 5 && j === 5 ? (
                          <QRLogo src="/app-icon.svg" alt="App Icon" key="logo" />
                        ) : (
                          <div key={j} style={{ width: 18, height: 18 }} />
                        )
                      ) : (
                        <QRDot key={j} opacity={opacity} />
                      )
                    )}
                  </QRCol>
                ))}
              </QRCodeGrid>
              <QRRefresh onClick={refreshQR} />
            </QRInner>
          </QRFrame>
          <QRHint>Open your camera to scan this code.</QRHint>
        </QRSection>
        <CloseButton aria-label="Close QR code" tabIndex={0}>
          <CloseIcon aria-hidden="true" />
        </CloseButton>
      </Overlay>
    </Background>
  );
}
