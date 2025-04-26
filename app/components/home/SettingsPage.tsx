"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import RoomQRCodePage from './RoomQRCodePage';

const PARTICIPANT_COLORS = [
  '#2C3851', // Blue
  '#F2994A', // Orange
  '#27AE60', // Green
  '#9B51E0', // Purple
  '#EB5757', // Red
  '#56CCF2', // Light Blue
  '#F2C94C', // Yellow
  '#6FCF97', // Light Green
];

const participants = [
  { name: 'Marcus', color: PARTICIPANT_COLORS[0] },
  { name: 'Julius', color: PARTICIPANT_COLORS[1] },
  { name: 'Cleopatra', color: PARTICIPANT_COLORS[2] },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 172px 12px 64px;
  gap: 32px;
  isolation: isolate;
  position: relative;
  width: 375px;
  height: 1634px;
  min-height: 812px;
  background: #FFFFFF;
`;

const Section = styled.div`
  width: 351px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.div`
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-transform: uppercase;
  color: rgba(16, 30, 58, 0.48);
  height: 14px;
  letter-spacing: 0.04em;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 31px;
  gap: 8px;
`;

const Label = styled.div`
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #101E3A;
`;

const Toggle = styled.button.attrs<{on: boolean}>(props => ({
  'data-on': props.on,
}))<{
  on: boolean;
}>`
  width: 51px;
  height: 31px;
  background: #2C3851;
  border-radius: 99px;
  border: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    left: ${({on}) => on ? '27px' : '2px'};
    top: 2px;
    width: 24px;
    height: 24px;
    background: #FFF;
    border-radius: 50%;
    box-shadow: 0px 1px 4px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.08), 0px 4px 12px rgba(0,0,0,0.16);
    transition: left 0.2s;
  }
`;

const Divider = styled.div`
  width: 351px;
  height: 1px;
  background: rgba(16, 30, 58, 0.08);
  border-radius: 100px;
`;

const CopyButton = styled.button`
  background: #101E3A;
  color: #fff;
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  min-width: 44px;
  min-height: 44px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  margin-left: 8px;
  outline: none;
  transition: box-shadow 0.2s, opacity 0.2s;
  opacity: ${({disabled}) => disabled ? 0.48 : 1};
  &:focus {
    box-shadow: 0 0 0 2px #101E3A;
    outline: none;
    z-index: 2;
  }
`;

const QRButton = styled.button`
  background: #fff;
  color: #101E3A;
  border: 2px solid #101E3A;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  min-width: 44px;
  min-height: 44px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;
  text-decoration: none;
  margin-left: 8px;
  outline: none;
  transition: box-shadow 0.2s, opacity 0.2s;
  opacity: ${({disabled}) => disabled ? 0.48 : 1};
  &:focus {
    box-shadow: 0 0 0 2px #101E3A;
    outline: none;
    z-index: 2;
  }
`;

const ParticipantRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
`;

const ParticipantDot = styled.span<{color: string}>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({color}) => color};
  margin-right: 8px;
`;
const ParticipantName = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #2C3851;
`;

const SettingsPage: React.FC = () => {
  // Example toggles for privacy section
  const [blockSharingLinks, setBlockSharingLinks] = useState(true);
  const [blockSharingMedia, setBlockSharingMedia] = useState(true);
  const [blockCopying, setBlockCopying] = useState(true);
  const [blockScreenshots, setBlockScreenshots] = useState(true);
  const [disappearingMessages, setDisappearingMessages] = useState(true);
  const [hideLastSeen, setHideLastSeen] = useState(true);
  const [hideReadStatus, setHideReadStatus] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [blockIndividual, setBlockIndividual] = useState(true);

  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const roomId = "81313189"; // TODO: Replace with dynamic room ID
  const roomName = "Room Name"; // TODO: Replace with dynamic room name

  const handleCopy = async () => {
    await navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleShowQRCode = () => {
    router.push(`/room-qr-code?roomId=${roomId}&roomName=${encodeURIComponent(roomName)}`);
  };

  return (
    <Wrapper>
      {/* Direct Link & Shared Media */}
      <Section>
        <SectionTitle>Direct Link</SectionTitle>
        <Row>
          <Label>paperchat.io/{roomId}</Label>
          <CopyButton onClick={handleCopy} aria-label="Copy room ID" tabIndex={0}>{copied ? "Copied!" : "Copy ID"}</CopyButton>
          <QRButton onClick={handleShowQRCode} aria-label="Show room QR code" tabIndex={0}>QR</QRButton>
        </Row>
        <SectionTitle>Shared Media 12</SectionTitle>
        <Row>
          <Label>[media gallery placeholder]</Label>
        </Row>
      </Section>
      {/* Members */}
      <Section>
        <SectionTitle>Members</SectionTitle>
        {participants.map((p, i) => (
          <ParticipantRow key={p.name}>
            <ParticipantDot color={p.color} />
            <ParticipantName>{p.name}</ParticipantName>
          </ParticipantRow>
        ))}
      </Section>
      {/* Privacy & Security */}
      <Section>
        <SectionTitle>Privacy & Security</SectionTitle>
        <Row>
          <Label>Block sharing links</Label>
          <Toggle on={blockSharingLinks} onClick={()=>setBlockSharingLinks(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Block sharing media</Label>
          <Toggle on={blockSharingMedia} onClick={()=>setBlockSharingMedia(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Block copying</Label>
          <Toggle on={blockCopying} onClick={()=>setBlockCopying(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Block screenshots</Label>
          <Toggle on={blockScreenshots} onClick={()=>setBlockScreenshots(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Disappearing messages</Label>
          <Toggle on={disappearingMessages} onClick={()=>setDisappearingMessages(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Hide last seen</Label>
          <Toggle on={hideLastSeen} onClick={()=>setHideLastSeen(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Hide read status</Label>
          <Toggle on={hideReadStatus} onClick={()=>setHideReadStatus(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Secure with PIN code</Label>
          <span>→</span>
        </Row>
      </Section>
      {/* Appearance */}
      <Section>
        <SectionTitle>Appearance</SectionTitle>
        <Row>
          <Label>Dark Mode</Label>
          <Toggle on={darkMode} onClick={()=>setDarkMode(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Theme</Label>
          <span>→</span>
        </Row>
      </Section>
      {/* Account Actions */}
      <Section>
        <SectionTitle>Account Actions</SectionTitle>
        <Row>
          <Label>Block this individual</Label>
          <Toggle on={blockIndividual} onClick={()=>setBlockIndividual(v=>!v)} />
        </Row>
        <Divider />
        <Row>
          <Label>Report this individual</Label>
          <span>→</span>
        </Row>
      </Section>
      <div style={{marginTop: 24, color: '#828186', fontFamily: 'Poppins', fontSize: 12, textAlign: 'center', width: 351}}>
        We are constantly working on improving Paper Chat’s experience for all of our users.
      </div>
    </Wrapper>
  );
};

export default SettingsPage;
