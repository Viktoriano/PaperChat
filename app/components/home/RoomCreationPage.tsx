'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import DotGrid from './HomePage';

const BG_IMAGE = '/Conversation_Background.png';

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background: url(${BG_IMAGE});
  overflow: hidden;
  margin: 0 auto;
`;

const Rectangle3 = styled.div`
  position: absolute;
  width: 1312px;
  height: 1px;
  left: 64px;
  top: 891px;
  background: rgba(16, 30, 58, 0.16);
`;

const Title = styled.div`
  position: absolute;
  width: 161px;
  height: 21px;
  top: 116px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  color: #2C3851;
`;

const WithFriends = styled.div`
  position: absolute;
  width: 144px;
  height: 20px;
  left: calc(50% - 144px/2 - 103.5px);
  top: calc(50% - 20px/2 + 206px);
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, rgba(16, 30, 58, 0.64) 0%, rgba(16, 30, 58, 0.4096) 50%, rgba(16, 30, 58, 0.64) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const InputFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 351px;
  height: 68px;
`;

const InputBox = styled.input`
  width: 327px;
  height: 48px;
  background: rgba(16, 30, 58, 0.04);
  border-radius: 12px;
  border: none;
  padding: 0px 12px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #2C3851;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.03em;
  outline: none;
  margin-bottom: 8px;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #2C3851;
    outline: none;
    z-index: 2;
  }
  &::placeholder {
    color: rgba(16, 30, 58, 0.48);
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.03em;
  }
`;

const WarningRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 351px;
  height: 12px;
`;
const Icon12 = styled.span`
  font-size: 12px;
  color: rgba(16, 30, 58, 0.48);
  display: flex;
  align-items: center;
`;
const WarningText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.48);
`;

const BottomFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px 34px;
  gap: 12px;
  position: absolute;
  width: 375px;
  height: 170px;
  left: calc(50% - 375px/2);
  bottom: 0px;
  background: #FFFFFF;
  backdrop-filter: blur(16px);
  border-radius: 0px;
`;
const ActionFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 351px;
  height: 104px;
`;
const ActionButton = styled.button<{primary?: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
  width: 351px;
  height: 48px;
  background: ${({ primary }) => primary ? 'rgba(16, 30, 58, 0.8)' : 'rgba(16, 30, 58, 0.04)'};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: ${({ primary }) => primary ? '#FFFFFF' : '#2C3851'};
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #2C3851;
    outline: none;
    z-index: 2;
  }
`;
const TOSRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 351px;
  height: 12px;
`;
const TosText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.48);
  text-align: center;
`;

export default function RoomCreationPage() {
  const [roomName, setRoomName] = useState('');
  const [existingRooms, setExistingRooms] = useState<string[]>([]);
  const [suggestedName, setSuggestedName] = useState('');
  const router = useRouter();

  useEffect(() => {
    setExistingRooms([]);
  }, []);

  useEffect(() => {
    const adjectives = [
      'Brave', 'Clever', 'Cosmic', 'Daring', 'Electric', 'Gentle', 'Happy', 'Jolly', 'Lucky', 'Mighty', 'Noble', 'Quiet', 'Rapid', 'Sunny', 'Vivid', 'Wise', 'Zesty', 'Chill', 'Lively', 'Calm', 'Funky', 'Epic', 'Wild', 'Magic', 'Swift', 'Bold', 'Bright', 'Peaceful', 'Serene', 'Charming', 'Nifty', 'Radiant'
    ];
    const nouns = [
      'Owls', 'Penguins', 'Stars', 'Rockets', 'Wizards', 'Artists', 'Bears', 'Clouds', 'Dolphins', 'Eagles', 'Foxes', 'Giants', 'Heroes', 'Jaguars', 'Knights', 'Lions', 'Monkeys', 'Ninjas', 'Pirates', 'Quokkas', 'Rangers', 'Sharks', 'Tigers', 'Unicorns', 'Vikings', 'Wolves', 'Yogis', 'Zebras', 'Explorers', 'Friends', 'Dreamers', 'Creators', 'Legends', 'Squad', 'Crew', 'Team', 'Club'
    ];
    function isClean(name: string) {
      const banned = [/sex/i, /porn/i, /fuck/i, /shit/i, /bitch/i, /dick/i, /cock/i, /pussy/i, /cum/i, /ass/i, /nazi/i, /hitler/i, /rape/i, /kill/i, /murder/i, /slave/i, /fag/i, /cunt/i, /whore/i, /anal/i, /orgy/i, /blowjob/i, /suck/i, /jerk/i, /molest/i, /pedophile/i, /incest/i, /beastiality/i];
      return !banned.some(r => r.test(name));
    }
    let tries = 0;
    let name = '';
    do {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      name = `The ${adj} ${noun}`;
      tries++;
    } while ((existingRooms.includes(name) || !isClean(name)) && tries < 20);
    setSuggestedName(name);
    setRoomName(name);
  }, [existingRooms]);

  return (
    <Wrapper>
      <DotGrid style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <Title>Paper Chat</Title>
      <WithFriends>With Friends</WithFriends>
      <InputFrame style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <InputBox
          placeholder={suggestedName || 'E.g. The Fantastics...'}
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          aria-label="Room name"
        />
        <WarningRow>
          <Icon12 className="material-icons-outlined">info</Icon12>
          <WarningText>Inappropriate names are forbidden.</WarningText>
        </WarningRow>
      </InputFrame>
      <BottomFrame>
        <ActionFrame>
          <ActionButton primary onClick={() => router.push('/set-room-password-yes-no')} aria-label="Confirm and Enter">
            Confirm & Enter
          </ActionButton>
        </ActionFrame>
        <TOSRow>
          <TosText>By pressing <b>“Continue”</b> you agree with PaperChat <a href="/tos" style={{color:'#2C3851'}}>TOS</a>.</TosText>
        </TOSRow>
      </BottomFrame>
      <Rectangle3 />
    </Wrapper>
  );
}
