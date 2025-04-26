import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RoomChatPage from '../RoomChatPage';

describe('RoomChatPage', () => {
  it('renders header and input', () => {
    const { getByText, getByPlaceholderText } = render(<RoomChatPage />);
    expect(getByText('Paper Chat')).toBeTruthy();
    expect(getByPlaceholderText('Enter message...')).toBeTruthy();
  });

  it('sends a text message', () => {
    const { getByPlaceholderText, getByText } = render(<RoomChatPage />);
    const input = getByPlaceholderText('Enter message...');
    fireEvent.changeText(input, 'Hello world');
    fireEvent.press(getByText('Send'));
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('shows message actions on long press', () => {
    const { getByText, getByTestId } = render(<RoomChatPage />);
    fireEvent.press(getByText('Send'));
    fireEvent(getByText('Send'), 'onLongPress');
    expect(getByTestId('message-actions')).toBeTruthy();
  });

  it('renders info and date labels', () => {
    const { getByText } = render(<RoomChatPage />);
    expect(getByText('Keep clean and respectful chats at any time.')).toBeTruthy();
    expect(getByText(/joined the chat/)).toBeTruthy();
    expect(getByText(/left the chat/)).toBeTruthy();
  });
});
