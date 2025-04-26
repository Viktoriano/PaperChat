"use client";
import React from "react";
import styled from "styled-components";
// Use react-qr-code instead of qrcode.react
import QRCode from "react-qr-code";

// Props: roomName, roomId
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #fff;
  padding: 56px 16px 32px 16px;
`;

const RoomName = styled.h2`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 28px;
  color: #2C3851;
  margin-bottom: 12px;
`;

const RoomId = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #828186;
  margin-bottom: 28px;
`;

const QRWrapper = styled.div`
  background: rgba(16, 30, 58, 0.08);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(44,56,81,0.08);
`;

interface RoomQRCodePageProps {
  roomName?: string;
  roomId?: string;
}

const RoomQRCodePage: React.FC<RoomQRCodePageProps> = ({ roomName = "Room Name", roomId = "81313189" }) => {
  const roomUrl = `https://paperchat.io/${roomId}`;
  return (
    <Wrapper>
      <RoomName>{roomName}</RoomName>
      <RoomId>ID: {roomId}</RoomId>
      <QRWrapper aria-label="Room QR code" tabIndex={0}>
        <QRCode value={roomUrl} size={192} bgColor="#fff" fgColor="#2C3851" level="H" aria-hidden="true" />
      </QRWrapper>
      <div style={{fontFamily:'Poppins',fontSize:14,color:'#2C3851',opacity:0.5}}>Scan to join this room</div>
    </Wrapper>
  );
};

export default RoomQRCodePage;
