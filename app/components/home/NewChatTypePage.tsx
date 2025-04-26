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

const LogoFrame = styled.div`
  position: absolute;
  width: 193.28px;
  height: 48.28px;
  left: 91px;
  top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 12px;
`;

const LogoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 193.28px;
  height: 28.28px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const PaperPlaneIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border-radius: 8px;
  transform: rotate(-45deg);
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const PaperChatText = styled.span`
  width: 157px;
  height: 21px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 24px;
  leading-trim: both;
  text-edge: cap;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;
  color: #2C3851;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const SolaGroup = styled.div`
  width: 193.28px;
  height: 8px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  leading-trim: both;
  text-edge: cap;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.03em;
  color: rgba(18, 18, 18, 0.48);
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const AnimatedLabel = styled.div`
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
  background: linear-gradient(270deg, rgba(16,30,58,0.64) 0%, rgba(16,30,58,0.4096) 50%, rgba(16,30,58,0.64) 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: gradientMove 2s linear infinite;

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
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
const YesText = styled.span`
  width: 31px;
  height: 20px;
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
  height: 20px;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #2C3851;
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
const Icon12 = styled.span`
  font-size: 12px;
  color: rgba(16, 30, 58, 0.48);
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

export default function NewChatTypePage() {
  const router = useRouter();
  return (
    <Wrapper>
      <LogoFrame>
        <LogoRow>
          <PaperPlaneIcon className="material-icons-outlined">send</PaperPlaneIcon>
          <PaperChatText>Paper Chat</PaperChatText>
        </LogoRow>
        <SolaGroup>Part of Sola Group.</SolaGroup>
      </LogoFrame>
      <AnimatedLabel>With Friends</AnimatedLabel>
      <WithFriends style={{display:'none'}}>With Friends</WithFriends>
      <BottomFrame>
        <ActionFrame>
          <ActionButton aria-label="Start group chat" tabIndex={0} primary onClick={() => router.push('/contact-list')}><YesText>Yes</YesText></ActionButton>
          <ActionButton aria-label="Start private chat" tabIndex={0} onClick={() => router.push('/set-room-password-yes-no')}><NoText>No</NoText></ActionButton>
        </ActionFrame>
        <TOSRow>
          <Icon12 className="material-icons-outlined">radio_button_unchecked</Icon12>
          <TosText>By pressing <b>“Continue”</b> you agree with PaperChat <a href="/tos" style={{color:'#2C3851'}}>TOS</a>.</TosText>
        </TOSRow>
      </BottomFrame>
      <Rectangle3 />
    </Wrapper>
  );
}
