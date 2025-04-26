import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, TextInput, FlatList, Platform } from 'react-native';
import MessageActionsRN from './MessageActionsRN';
import { Clipboard } from 'react-native';

// Root container
const Container = styled(View)`
  position: relative;
  width: 375px;
  height: 2324px;
  background: #FFFFFF;
  border-width: 8px;
  border-color: #000000;
  align-items: center;
`;

// Main chat frame
const MainFrame = styled(View)`
  position: absolute;
  width: 335px;
  height: 2016px;
  left: 20px;
  top: 154px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 20px;
`;

const InfoLabel = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 6px;
  gap: 10px;
  width: 136px;
  height: 20px;
  background: #F5F5F5;
  border-radius: 4px;
`;

const InfoLabelText = styled(Text)`
  width: 124px;
  height: 8px;
  font-family: 'Poppins-Regular';
  font-size: 12px;
  line-height: 24px;
  letter-spacing: -0.24px;
  color: #2C3851;
  text-align: center;
  align-items: center;
`;

const NoticeFrame = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 4px;
  gap: 4px;
  width: 284px;
  height: 20px;
  background: #F5F5F5;
  border-radius: 4px;
`;

const NoticeText = styled(Text)`
  width: 258px;
  height: 8px;
  font-family: 'Poppins-Regular';
  font-size: 12px;
  line-height: 24px;
  letter-spacing: -0.24px;
  color: #2C3851;
  text-align: center;
  align-items: center;
`;

const ChatBubble = styled(View)<{dark?: boolean}>`
  background: ${({dark})=>dark ? 'rgba(16,30,58,0.8)' : '#F5F5F5'};
  border-radius: 8px;
  padding: 12px 10px;
  gap: 10px;
  width: 335px;
  min-height: 60px;
  margin-bottom: 10px;
  align-self: ${({dark}) => dark ? 'flex-end' : 'flex-start'};
`;

const ChatBubbleText = styled(Text)<{dark?: boolean}>`
  width: 315px;
  font-family: 'Poppins-Regular';
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: ${({dark})=>dark ? '#FFFFFF' : '#2C3851'};
  align-items: center;
`;

const ChatMeta = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 5px;
  width: 335px;
  height: 25px;
`;

const MetaTime = styled(Text)`
  width: 136px;
  font-family: 'Poppins-Regular';
  font-size: 12px;
  line-height: 24px;
  letter-spacing: -0.24px;
  color: rgba(44,56,81,0.48);
  text-align: center;
`;

const InputRow = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 335px;
  height: 48px;
  background: rgba(16, 30, 58, 0.04);
  border-radius: 100px;
  padding: 0px 12px;
  margin-bottom: 16px;
`;

const ChatInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  color: #121212;
  font-family: 'Poppins-Regular';
  padding: 0 8px;
`;

const SendButton = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: #2C3851;
`;

const SendButtonText = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-family: 'Poppins-Medium';
`;

const RoomChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [activeMsgId, setActiveMsgId] = useState<number|null>(null);
  const [replyTo, setReplyTo] = useState<string|null>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'text', text: input, id: Date.now() }]);
      setInput('');
    }
  };

  const handleLike = (msgId: number) => {
    // Replace with your like logic
    alert('Liked!');
    setActiveMsgId(null);
  };
  const handleReply = (msg: any) => {
    setReplyTo(msg.text);
    setActiveMsgId(null);
  };
  const handleCopy = (msg: any) => {
    Clipboard.setString(msg.text);
    alert('Copied!');
    setActiveMsgId(null);
  };
  const handleReport = (msgId: number) => {
    // Replace with your report logic
    alert('Reported!');
    setActiveMsgId(null);
  };

  return (
    <Container>
      <MainFrame>
        {replyTo && (
          <InfoLabel>
            <InfoLabelText>Replying to: {replyTo}</InfoLabelText>
          </InfoLabel>
        )}
        <FlatList
          style={{marginTop: 0, width: 335}}
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onLongPress={() => setActiveMsgId(item.id)}
              activeOpacity={0.8}
            >
              <ChatBubble dark={false}>
                <ChatBubbleText>{item.text}</ChatBubbleText>
                {activeMsgId === item.id && (
                  <MessageActionsRN
                    onLike={() => handleLike(item.id)}
                    onReply={() => handleReply(item)}
                    onCopy={() => handleCopy(item)}
                    onReport={() => handleReport(item.id)}
                  />
                )}
              </ChatBubble>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <>
              <NoticeFrame>
                <NoticeText>Tuesday June 11, 2025</NoticeText>
              </NoticeFrame>
              <NoticeFrame>
                <NoticeText>Keep clean and respectful chats at any time.</NoticeText>
              </NoticeFrame>
              <ChatBubble dark>
                <ChatBubbleText dark>
                  A grayscale sketch pen drawn illustration of a Chat desktop user interface. There's a large text box at the bottom where a user can type their message. There are multiple chat bubbles above the text box, each containing a message. The background is a light gray. less
                </ChatBubbleText>
              </ChatBubble>
              <ChatBubble>
                <ChatBubbleText>
                  The Romans, who adopted many Greek beliefs, associated owls with Minerva
                </ChatBubbleText>
              </ChatBubble>
              <NoticeFrame>
                <NoticeText>Cleopatra joined the chat</NoticeText>
              </NoticeFrame>
              <NoticeFrame>
                <NoticeText>Cesar left the chat</NoticeText>
              </NoticeFrame>
            </>
          }
        />
        <InputRow>
          <ChatInput
            placeholder="Enter message..."
            value={input}
            onChangeText={setInput}
            placeholderTextColor="#B3B3B3"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <SendButton onPress={handleSend} accessibilityRole="button">
            <SendButtonText>Send</SendButtonText>
          </SendButton>
        </InputRow>
      </MainFrame>
    </Container>
  );
};

export default RoomChatPage;
