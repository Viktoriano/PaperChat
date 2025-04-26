"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background: #fff;
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
  padding: 0;
  gap: 24px;
  position: absolute;
  width: 351px;
  height: 84px;
  left: calc(50% - 351px/2);
  top: calc(50% - 84px/2 - 14px);
`;

const Title = styled.div`
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

const PasswordInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: 351px;
  height: 40px;
  background: rgba(16, 30, 58, 0.04);
  border-radius: 8px;
`;

const PasswordInput = styled.input`
  width: 100%;
  height: 32px;
  border: none;
  background: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: rgba(16, 30, 58, 0.64);
  outline: none;
  text-align: center;
`;

const PaperChatLogo = styled.div`
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
  bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 100%);
  backdrop-filter: blur(16px);
  border-radius: 0;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 8px;
  width: 351px;
  height: 48px;
  backdrop-filter: blur(16px);
`;

const ConfirmButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: 295px;
  height: 48px;
  background: rgba(16, 30, 58, 0.8);
  border-radius: 8px;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #fff;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(16, 30, 58, 1);
  }
`;

const ConfirmLabel = styled.span`
  width: 72px;
  height: 13px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  color: #fff;
`;

const TosRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 4px;
  width: 351px;
  height: 12px;
`;

const TosText = styled.span`
  width: 308px;
  height: 8px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.48);
`;

export default function SetRoomPasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleConfirm = () => {
    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    setError("");
    // Simulate saving password and go to enter-room-name
    router.push("/enter-room-name");
  };

  const handleBack = () => router.back();

  return (
    <Wrapper>
      <PaperChatLogo>Paper Chat</PaperChatLogo>
      <button
        style={{position:'absolute',left:16,top:24,background:'none',border:'none',fontSize:24,cursor:'pointer',color:'#2C3851'}}
        onClick={handleBack}
        aria-label="Back"
      >
        ←
      </button>
      <CenterFrame>
        <Title>Set a password</Title>
        <PasswordInputWrapper>
          <PasswordInput
            type="password"
            value={password}
            placeholder="******"
            onChange={e => setPassword(e.target.value)}
            maxLength={32}
          />
        </PasswordInputWrapper>
        {error && (
          <div style={{color: '#d32f2f', fontSize: 14, marginTop: 4, textAlign: 'center'}}>{error}</div>
        )}
      </CenterFrame>
      <Rectangle3 />
      <BottomFrame>
        <ButtonRow>
          <ConfirmButton onClick={handleConfirm}>
            <ConfirmLabel>Confirm</ConfirmLabel>
          </ConfirmButton>
        </ButtonRow>
        <TosRow>
          <TosText>By pressing “Continue” you agree with PaperChat TOS.</TosText>
        </TosRow>
      </BottomFrame>
    </Wrapper>
  );
}
