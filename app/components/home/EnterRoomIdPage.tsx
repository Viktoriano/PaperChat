"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background: #FFFFFF;
`;

const Rectangle3 = styled.div`
  position: absolute;
  width: 1312px;
  height: 1px;
  left: 64px;
  top: 891px;
  background: rgba(16, 30, 58, 0.16);
`;

const CenterFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;
  position: absolute;
  width: 351px;
  height: 112px;
  left: calc(50% - 351px/2);
  top: calc(50% - 112px/2);
`;

const CodeLabel = styled.div`
  width: 351px;
  height: 20px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  color: rgba(16, 30, 58, 0.64);
`;

const CodeInputFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 351px;
  height: 68px;
`;

const RoomInput = styled.input`
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

const ErrorMsg = styled.div`
  width: 85px;
  height: 8px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.64);
  display: flex;
  align-items: center;
`;

const BottomFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px 34px;
  gap: 12px;
  position: absolute;
  width: 375px;
  height: 118px;
  left: calc(50% - 375px/2);
  bottom: 0px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.08) 100%);
  backdrop-filter: blur(16px);
  border-radius: 0px;
`;
const ActionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 351px;
  height: 48px;
  backdrop-filter: blur(16px);
`;
const BackButtonFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 8.57px;
  width: 48px;
  height: 48px;
  background: #FFFFFF;
  box-shadow: 0px 4px 32px rgba(18, 18, 18, 0.16);
  backdrop-filter: blur(16px);
  border-radius: 85.7143px;
  cursor: pointer;
`;
const BackIcon = styled.span`
  margin: 0 auto;
  width: 27.43px;
  height: 27.43px;
  font-size: 27.43px;
  color: rgba(16, 30, 58, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ConfirmButton = styled.button`
  width: 120px;
  height: 40px;
  background: #2C3851;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  margin-bottom: 12px;
  opacity: ${({disabled}) => disabled ? 0.4 : 1};
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #2C3851;
    outline: none;
    z-index: 2;
  }
`;
const TosRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 4px;
  width: 351px;
  height: 12px;
`;
const TosIcon = styled.span`
  width: 12px;
  height: 12px;
  font-size: 12px;
  color: rgba(16, 30, 58, 0.48);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TosText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.48);
  text-align: center;
  width: 308px;
  height: 8px;
  display: flex;
  align-items: center;
`;

export default function EnterRoomIdPage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  // TODO: Replace with real API
  async function checkRoomStatus(roomId: string) {
    // Simulated API response
    // Example: { hasPassword: true, userHasAccount: false }
    if (roomId === 'NOPASS') return { hasPassword: false, userHasAccount: false };
    if (roomId === 'HASPASS') return { hasPassword: true, userHasAccount: false };
    if (roomId === 'USERACC') return { hasPassword: false, userHasAccount: true };
    // Default: password required
    return { hasPassword: true, userHasAccount: false };
  }

  const validateRoomId = (id: string) => {
    // Example: require at least 6 alphanumeric chars
    return /^[A-Z0-9]{6,12}$/i.test(id);
  };

  const handleConfirm = async () => {
    if (!validateRoomId(roomId)) {
      setError('Enter a valid ID.');
      return;
    }
    setError('');
    const status = await checkRoomStatus(roomId);
    if (status.hasPassword) {
      router.push('/enter-room-password');
    } else if (!status.userHasAccount) {
      router.push('/enter-room-name');
    } else {
      router.push('/room-chat');
    }
  };

  return (
    <Wrapper>
      <CenterFrame>
        <CodeLabel>Enter Unique ID</CodeLabel>
        <CodeInputFrame>
          <RoomInput
            placeholder="E.g. DAD819D"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            aria-label="Enter room code"
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </CodeInputFrame>
      </CenterFrame>
      <BottomFrame>
        <ActionRow>
          <BackButtonFrame onClick={() => router.back()}>
            <BackIcon className="material-icons-outlined">chevron_left</BackIcon>
          </BackButtonFrame>
          <ConfirmButton onClick={handleConfirm} disabled={!validateRoomId(roomId)} aria-label="Confirm and join room">
            Confirm
          </ConfirmButton>
        </ActionRow>
        <TosRow>
          <TosIcon className="material-icons-outlined">radio_button_unchecked</TosIcon>
          <TosText>By pressing <b>“Continue”</b> you agree with PaperChat <a href="/tos" style={{color:'#2C3851'}}>TOS</a>.</TosText>
        </TosRow>
      </BottomFrame>
      <Rectangle3 />
    </Wrapper>
  );
}
