import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background: #FFFFFF;
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
  left: 107px;
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

const ActionFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 351px;
  height: 48px;
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: 175px;
  height: 48px;
  background: ${props => props.primary ? 'rgba(16, 30, 58, 0.8)' : 'rgba(16, 30, 58, 0.04)'};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: ${props => props.primary ? '#FFFFFF' : 'rgba(16, 30, 58, 0.64)'};
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

const TosText = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.48);
  text-align: center;
`;

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleYes = () => router.push("/set-room-password");
  const handleNo = () => router.push("/enter-room-name");
  const handleConfirm = () => router.push("/set-room-password");

  return (
    <Wrapper>
      <Title>Set a password?</Title>
      <BottomFrame>
        <ActionFrame>
          <ActionButton primary onClick={handleYes} aria-label="Yes, set a password">Yes</ActionButton>
          <ActionButton onClick={handleNo} aria-label="No, do not set a password">No</ActionButton>
        </ActionFrame>
        <TosRow>
          <span className="material-symbols-outlined" style={{fontSize:12, color:'rgba(16,30,58,0.48)'}}>radio_button_unchecked</span>
          <TosText>By pressing <b>“Continue”</b> you agree with PaperChat <a href="/tos" style={{color:'#2C3851'}}>TOS</a>.</TosText>
        </TosRow>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-label="Set password"
          style={{
            width: '327px',
            height: '48px',
            background: 'rgba(16, 30, 58, 0.04)',
            borderRadius: '12px',
            border: 'none',
            padding: '0px 12px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '16px',
            color: '#2C3851',
            fontWeight: 400,
            lineHeight: '24px',
            letterSpacing: '-0.03em',
            outline: 'none',
            marginBottom: '8px',
            transition: 'box-shadow 0.2s',
          }}
        />
        <button
          onClick={handleConfirm}
          aria-label="Set password and continue"
          style={{
            width: '120px',
            height: '40px',
            background: '#2C3851',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            cursor: 'pointer',
            marginBottom: '12px',
            opacity: 1,
            outline: 'none',
            transition: 'box-shadow 0.2s',
          }}
        >
          Set Password
        </button>
      </BottomFrame>
      <Rectangle3 />
    </Wrapper>
  );
}
