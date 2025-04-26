'use client';

import React from 'react';
import RoomInterface from '@/components/room/RoomInterface';
import { useRouter } from 'next/navigation';

const sampleMessages = [
  {
    id: '1',
    type: 'text' as const,
    content: 'Hello everyone! Welcome to PaperChat!',
    userId: '1',
    username: 'Marcus',
    timestamp: new Date(2024, 2, 15, 10, 30).toISOString(),
    userColor: '#1DB954'
  },
  {
    id: '2',
    type: 'text' as const,
    content: 'Hi Marcus! Thanks for having us here.',
    userId: '2',
    username: 'Julius',
    timestamp: new Date(2024, 2, 15, 10, 31).toISOString(),
    userColor: '#FF4B4B'
  },
  {
    id: '3',
    type: 'poll' as const,
    content: {
      options: ['Pizza', 'Burger', 'Sushi', 'Salad'],
      votes: { 'Pizza': 2, 'Burger': 1, 'Sushi': 1 }
    },
    userId: '3',
    username: 'Cleopatra',
    timestamp: new Date(2024, 2, 15, 10, 32).toISOString(),
    userColor: '#29B6F6'
  }
];

const currentUser = {
  id: '1',
  name: 'Marcus',
  color: '#1DB954'
};

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default function RoomPage({ params }: RoomPageProps) {
  const router = useRouter();

  const handleLeave = () => {
    router.push('/');
  };

  return (
    <main>
      <RoomInterface
        roomId={params.roomId}
        messages={sampleMessages}
        currentUser={currentUser}
        onLeave={handleLeave}
      />
    </main>
  );
}