"use client";
import React from "react";
import styled from "styled-components";

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 5px;
  width: 180px;
  height: 25px;
  background: rgba(245,245,245,0.98);
  backdrop-filter: blur(1px);
  border-radius: 4px;
  z-index: 100;
`;

const ActionBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 6px;
  gap: 4px;
  height: 25px;
  border: 1px solid rgba(16, 30, 58, 0.08);
  border-radius: 4px;
  background: #fff;
  color: #2C3851;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #F5F5F5;
  }
`;

export interface MessageActionsProps {
  onLike: () => void;
  onReply: () => void;
  onCopy: () => void;
  onReport: () => void;
}

export default function MessageActions({ onLike, onReply, onCopy, onReport }: MessageActionsProps) {
  return (
    <ActionsWrapper>
      <ActionBtn onClick={onLike} title="Like"><span className="material-icons-outlined">thumb_up</span>Like</ActionBtn>
      <ActionBtn onClick={onReply} title="Reply"><span className="material-icons-outlined">reply</span>Reply</ActionBtn>
      <ActionBtn onClick={onCopy} title="Copy"><span className="material-icons-outlined">content_copy</span>Copy</ActionBtn>
      <ActionBtn onClick={onReport} title="Report"><span className="material-icons-outlined">flag</span>Report</ActionBtn>
    </ActionsWrapper>
  );
}
