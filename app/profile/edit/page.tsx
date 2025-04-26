'use client';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #2C3851;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
`;
const Card = styled.div`
  background: #22304a;
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 2px 24px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
`;
const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 100px;
  margin-bottom: 18px;
  object-fit: cover;
  background: #fff;
`;
const Input = styled.input`
  width: 100%;
  margin: 12px 0;
  padding: 0 12px;
  height: 48px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background: #32405e;
  color: #fff;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
`;
const Button = styled.button`
  flex: 1;
  padding: 0 12px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #fff;
  color: #22304a;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.18s, background 0.18s, color 0.18s;
  &:focus {
    box-shadow: 0 0 0 2px #3b7cff33;
    outline: none;
  }
  &:hover {
    background: #f5f5f5;
  }
  &:active {
    background: #e0e0e0;
  }
`;

export default function ProfileEditPage() {
  const [avatar, setAvatar] = useState('/default-avatar.png');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  return (
    <Container>
      <Card>
        <Avatar src={avatar} alt="Avatar" />
        <Input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
        <Input type="text" placeholder="Bio (optional)" value={bio} onChange={e => setBio(e.target.value)} />
        <ButtonRow>
          <Button type="button">Cancel</Button>
          <Button type="button">Save</Button>
        </ButtonRow>
      </Card>
    </Container>
  );
}
