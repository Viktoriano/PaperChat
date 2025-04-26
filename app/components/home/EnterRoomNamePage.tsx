"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  background: #fff;
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

const RoomNameInput = styled.input`
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

const CancelIcon = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  height: 24px;
  width: 24px;
`;

const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
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

export default function EnterRoomNamePage({ onComplete }: { onComplete?: (name: string) => void }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [placeholder, setPlaceholder] = useState("E.g. The Fantastics...");
  const router = useRouter();

  // Simulated list of existing room names
  const existingRooms = ["The Fantastics", "PaperChat Room", "General", "Cool Kids"];
  // Simulated list of inappropriate words
  const forbiddenWords = ["badword", "offensive", "admin", "mod"];

  function generateRandomName() {
    const adjectives = ["Brave", "Clever", "Sunny", "Mighty", "Gentle", "Noble", "Cosmic", "Lucky", "Jolly", "Swift"];
    const nouns = ["Owls", "Tigers", "Explorers", "Wizards", "Stars", "Dreamers", "Voyagers", "Pioneers", "Buddies", "Creators"];
    let candidate = "";
    let attempt = 0;
    do {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      candidate = `The ${adj} ${noun}`;
      attempt++;
      // Avoid infinite loop in extreme case
      if (attempt > 20) break;
    } while (existingRooms.includes(candidate) || forbiddenWords.some(w => candidate.toLowerCase().includes(w)));
    return candidate;
  }

  useEffect(() => {
    setPlaceholder(generateRandomName());
  }, []);

  const validateRoomName = (value: string) => {
    if (!value || value.length < 2) return false;
    if (existingRooms.includes(value.trim())) return false;
    if (forbiddenWords.some(w => value.toLowerCase().includes(w))) return false;
    return true;
  };

  const handleConfirm = () => {
    if (!validateRoomName(name)) {
      setError("Room name is invalid, exists, or inappropriate.");
      return;
    }
    setError("");
    if (onComplete) onComplete(name);
    else router.push("/room-chat");
  };

  return (
    <Wrapper>
      <CenterFrame>
        <Title>Enter Room Name</Title>
        <RoomNameInput
          placeholder={placeholder}
          value={name}
          onChange={e => setName(e.target.value)}
          aria-label="Enter room name"
        />
        {name && (
          <CancelIcon aria-label="Clear input" onClick={() => setName("")}
            tabIndex={0}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="9" fill="#E0E0E0"/>
              <path d="M6 6l6 6M12 6l-6 6" stroke="#2C3851" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </CancelIcon>
        )}
        {error && <ErrorText>{error}</ErrorText>}
        <ConfirmButton onClick={handleConfirm} disabled={!name.trim()} aria-label="Confirm room name">
          Confirm
        </ConfirmButton>
      </CenterFrame>
    </Wrapper>
  );
}
