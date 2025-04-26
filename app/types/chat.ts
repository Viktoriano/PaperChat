export interface Message {
  id: string;
  type: 'text' | 'image' | 'voice' | 'poll';
  content: string | {
    options: string[];
    votes: { [key: string]: number };
  };
  userId: string;
  username: string;
  timestamp: string;
  userColor: string;
}

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Room {
  id: string;
  name: string;
  messages: Message[];
  users: User[];
  createdAt: string;
  hasPassword: boolean;
} 