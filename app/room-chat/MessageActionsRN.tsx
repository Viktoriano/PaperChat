import React from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';

const ActionsWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 5px;
  width: 180px;
  height: 32px;
  background: rgba(245,245,245,0.98);
  border-radius: 4px;
  z-index: 100;
`;

const ActionBtn = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 6px;
  gap: 4px;
  height: 25px;
  border: 1px solid rgba(16, 30, 58, 0.08);
  border-radius: 4px;
  background: #fff;
  margin-horizontal: 2px;
`;

const ActionBtnText = styled(Text)`
  color: #2C3851;
  font-family: 'Poppins-Regular';
  font-size: 12px;
  line-height: 24px;
  letter-spacing: -0.24px;
  margin-left: 4px;
`;

export interface MessageActionsProps {
  onLike: () => void;
  onReply: () => void;
  onCopy: () => void;
  onReport: () => void;
}

export default function MessageActionsRN({ onLike, onReply, onCopy, onReport }: MessageActionsProps) {
  return (
    <ActionsWrapper testID="message-actions">
      <ActionBtn onPress={onLike} accessibilityRole="button">
        <Feather name="thumbs-up" size={12} color="#2C3851" />
        <ActionBtnText>Like</ActionBtnText>
      </ActionBtn>
      <ActionBtn onPress={onReply} accessibilityRole="button">
        <Feather name="corner-up-left" size={12} color="#2C3851" />
        <ActionBtnText>Reply</ActionBtnText>
      </ActionBtn>
      <ActionBtn onPress={onCopy} accessibilityRole="button">
        <Feather name="copy" size={12} color="#2C3851" />
        <ActionBtnText>Copy</ActionBtnText>
      </ActionBtn>
      <ActionBtn onPress={onReport} accessibilityRole="button">
        <MaterialCommunityIcons name="flag-outline" size={12} color="#2C3851" />
        <ActionBtnText>Report</ActionBtnText>
      </ActionBtn>
    </ActionsWrapper>
  );
}
