"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

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

const CenteredText = styled.div`
  position: absolute;
  width: 256px;
  height: 20px;
  left: calc(50% - 256px/2 - 0.5px);
  top: calc(50% - 20px/2);
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, rgba(16, 30, 58, 0.64) 0%, rgba(16, 30, 58, 0.4096) 50%, rgba(16, 30, 58, 0.64) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const BottomFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px 34px;
  gap: 12px;
  position: absolute;
  width: 375px;
  height: 114px;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
  background: #fff;
  backdrop-filter: blur(16px);
  border-radius: 0px;
`;

const ActionFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 8px;
  width: 351px;
  height: 48px;
`;

const ActionButton = styled.button<{primary?: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: 171.5px;
  height: 48px;
  background: ${({ primary }) => primary ? "rgba(16, 30, 58, 0.8)" : "rgba(16, 30, 58, 0.04)"};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.02em;
  color: ${({ primary }) => primary ? "#FFFFFF" : "#101E3A"};
`;

const YesText = styled.span`
  width: 31px;
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
  color: #FFFFFF;
`;

const NoText = styled.span`
  width: 25px;
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
  color: #101E3A;
`;

const TOSRow = styled.div`
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
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.03em;
  color: rgba(16, 30, 58, 0.48);
  text-align: center;
`;

const TosIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(16, 30, 58, 0.48);
  width: 16px;
  height: 16px;
`;

export default function SetPasswordPage() {
  const router = useRouter();
  return (
    <Wrapper>
      <CenteredText>Set a password?</CenteredText>
      <BottomFrame>
        <ActionFrame>
          <ActionButton primary onClick={() => router.push('/set-room-password')}><YesText>Yes</YesText></ActionButton>
          <ActionButton onClick={() => router.push('/enter-room-name')}><NoText>No</NoText></ActionButton>
        </ActionFrame>
        <TOSRow>
          <TosIcon className="material-symbols-outlined">info</TosIcon>
          <TosText>By pressing <b>“Continue”</b> you agree with PaperChat <a href="/tos" style={{color:'#2C3851'}}>TOS</a>.</TosText>
        </TOSRow>
      </BottomFrame>
      <Rectangle3 />
    </Wrapper>
  );
}
