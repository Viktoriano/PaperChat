import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 375px;
  height: 844px;
  min-height: 844px;
  background: #2C3851;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 160px 12px 0 12px;
  gap: 20px;
  isolation: isolate;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 351px;
`;

const RecentsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 82px;
  height: 16px;
`;

const RecentsText = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.5px;
  color: rgba(255,255,255,0.8);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 351px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 351px;
  height: 40px;
`;

const TitlesImg = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 255px;
  height: 40px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  object-fit: cover;
`;

const Titles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  width: 203px;
  height: 29px;
`;

const Name = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 104%;
  color: #FFFFFF;
`;

const Since = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 104%;
  color: rgba(255,255,255,0.48);
`;

const AcceptButton = styled.button`
  background: #27AE60;
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 32px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #27AE60;
    outline: none;
    z-index: 2;
  }
`;

const DeclineButton = styled.button`
  background: #EB5757;
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 32px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.2s;
  &:focus {
    box-shadow: 0 0 0 2px #EB5757;
    outline: none;
    z-index: 2;
  }
`;

const friendRequests = [
  {
    name: 'Myles Webb',
    since: 'Since March 12, 2025',
    avatar: '/avatars/myles.png',
  },
  {
    name: 'Josianne Minders',
    since: 'Since March 12, 2025',
    avatar: '/avatars/josianne.png',
  },
  {
    name: 'Edouard Philips',
    since: 'Since March 12, 2025',
    avatar: '/avatars/edouard.png',
  },
  {
    name: 'Marc Antoine',
    since: 'Since March 12, 2025',
    avatar: '/avatars/marc.png',
  },
];

export default function FriendRequestsPage() {
  const [requests, setRequests] = useState(friendRequests);
  const handleAccept = (idx: number) => {
    setRequests(requests => requests.filter((_, i) => i !== idx));
  };
  const handleDecline = (idx: number) => {
    setRequests(requests => requests.filter((_, i) => i !== idx));
  };
  return (
    <Wrapper>
      <Section>
        <RecentsHeader>
          <RecentsText>Recents</RecentsText>
        </RecentsHeader>
        <List>
          {requests.map((req, idx) => (
            <Item key={req.name}>
              <TitlesImg>
                <Avatar src={req.avatar} alt={req.name} />
                <Titles>
                  <Name>{req.name}</Name>
                  <Since>{req.since}</Since>
                </Titles>
              </TitlesImg>
              <AcceptButton aria-label="Accept friend request" tabIndex={0} onClick={() => handleAccept(idx)}>
                ✓
              </AcceptButton>
              <DeclineButton aria-label="Decline friend request" tabIndex={0} onClick={() => handleDecline(idx)}>
                ✕
              </DeclineButton>
            </Item>
          ))}
        </List>
      </Section>
    </Wrapper>
  );
}
