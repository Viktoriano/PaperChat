"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

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

const NameLabel = styled.div`
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

const InputFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 351px;
  height: 68px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 12px;
  width: 351px;
  height: 48px;
  background: rgba(16, 30, 58, 0.04);
  border-radius: 12px;
`;

const NameInput = styled.input`
  width: 327px;
  height: 24px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.64);
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
`;

const ErrorMsg = styled.div`
  width: 204px;
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
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  opacity: ${({disabled}) => disabled ? 0.4 : 1};
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

export default function EnterNamePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateName = (name: string) => {
    // For demo: at least 2 chars, no forbidden words
    if (!name.trim() || name.length < 2) return false;
    // Add real inappropriate name check here
    return true;
  };

  const handleConfirm = () => {
    if (!validateName(name)) {
      setError("Inappropriate names are forbidden.");
      return;
    }
    setError("");
    // Save name and continue
    router.push("/room-chat");
  };

  return (
    <Wrapper>
      <Title>Paper Chat</Title>
      <CenterFrame>
        <NameLabel>Enter a Name</NameLabel>
        <InputFrame>
          <InputBox>
            <NameInput
              placeholder="E.g. James John Jackson..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={32}
              autoFocus
            />
          </InputBox>
          <ErrorMsg>ⓘ Inappropriate names are forbidden.</ErrorMsg>
        </InputFrame>
      </CenterFrame>
      <BottomFrame>
        <ActionRow>
          <BackButtonFrame onClick={() => router.back()}>
            <BackIcon className="material-icons-outlined">chevron_left</BackIcon>
          </BackButtonFrame>
          <ConfirmButton onClick={handleConfirm} disabled={!validateName(name)}>
            Confirm & Enter
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
