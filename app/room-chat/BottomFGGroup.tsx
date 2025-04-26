"use client";
import React from "react";
import styled from "styled-components";
import VoiceRecorder from './VoiceRecorder';

const FGWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 20px 34px;
  gap: 10px;
  position: absolute;
  width: 375px;
  height: 94px;
  left: calc(50% - 375px/2);
  bottom: 0px;
  /* iOS-style progressive gradient blur background */
  background: linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.92) 80%, rgba(255,255,255,1) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 8px 32px 0 rgba(16,30,58,0.08);
  z-index: 10;
`;

const InputRow = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px;
  gap: 8px;
  width: 335px;
  height: 48px;
  background: rgba(16, 30, 58, 0.04);
  border: 1px solid rgba(16, 30, 58, 0.08);
  border-radius: 100px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  position: relative;
`;

const IconButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(16, 30, 58, 0.48);
  font-size: 20px;
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #2C3851;
    outline: none;
    z-index: 2;
  }
`;

const ChatInput = styled.input`
  width: 247px;
  height: 24px;
  border: none;
  background: transparent;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: rgba(18, 18, 18, 0.88);
  display: flex;
  align-items: center;
  outline: none;
  flex: 1;
  &:focus {
    box-shadow: 0 0 0 2px #2C3851;
    outline: none;
    z-index: 2;
  }
`;

export default function BottomFGGroup({ onSendMessage, onSendMedia, onSendVoice }) {
  const [input, setInput] = React.useState("");
  const fileInputRef = React.useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage?.(input);
      setInput("");
    }
  };

  const handleMediaChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onSendMedia?.(Array.from(files));
      e.target.value = ""; // reset input
    }
  };

  return (
    <FGWrapper>
      <InputRow>
        <IconButton
          type="button"
          aria-label="Add media"
          title="Add media"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-icons-outlined" aria-hidden="true">attach_file</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleMediaChange}
            aria-label="Upload media"
          />
        </IconButton>
        <IconButton
          type="button"
          aria-label="Create poll"
          title="Create poll"
          tabIndex={0}
          onClick={() => window.location.assign('/room-chat/poll')}
        >
          <span className="material-icons-outlined" aria-hidden="true">add</span>
        </IconButton>
        <ChatInput
          type="text"
          placeholder="Type message"
          aria-label="Type your message"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <IconButton
          type="button"
          aria-label="Send message"
          title="Send message"
          tabIndex={0}
          onClick={handleSend}
        >
          <span className="material-icons-outlined" aria-hidden="true">send</span>
        </IconButton>
        <VoiceRecorder onSend={onSendVoice} />
      </InputRow>
    </FGWrapper>
  );
}
