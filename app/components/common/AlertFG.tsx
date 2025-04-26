import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% { transform: translateY(-60px); opacity: 0; }
  20% { transform: translateY(0); opacity: 1; }
  80% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-60px); opacity: 0; }
`;

const AlertWrapper = styled.div<{ $show: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 8px;
  gap: 4px;
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  width: 92px;
  height: 32px;
  background: rgba(18, 18, 18, 0.04);
  backdrop-filter: blur(16px);
  border-radius: 100px;
  animation: ${slideDown} 1.2s cubic-bezier(0.4,0,0.2,1);
  pointer-events: none;
  opacity: ${props => (props.$show ? 1 : 0)};
`;

const IconCircle = styled.div`
  width: 16px;
  height: 16px;
  background: #23B672;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AlertText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #2C3851;
  margin-left: 8px;
`;

export interface AlertFGProps {
  text: string;
  icon?: React.ReactNode;
  show: boolean;
}

export default function AlertFG({ text, icon, show }: AlertFGProps) {
  return (
    <AlertWrapper $show={show}>
      <IconCircle>
        {icon ?? <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" fill="#23B672"/><path d="M3.5 5.5L4.75 6.75L7 4.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </IconCircle>
      <AlertText>{text}</AlertText>
    </AlertWrapper>
  );
}
