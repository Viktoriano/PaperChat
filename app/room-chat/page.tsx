"use client";

import BottomFGGroup from './BottomFGGroup';
import React from 'react';
import MessageActions from './MessageActions';
import TypingIndicator from "./TypingIndicator";

export default function Page() {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [activeMsgId, setActiveMsgId] = React.useState<number|null>(null);

  const handleSendMessage = (text: string) => {
    setMessages((msgs) => [...msgs, { type: 'text', text, id: Date.now() }]);
  };

  const handleSendMedia = (files: File[]) => {
    setMessages((msgs) => [
      ...msgs,
      ...files.map((file) => ({ type: file.type.startsWith('image') ? 'image' : 'video', file, id: Date.now() + Math.random() }))
    ]);
  };

  const handleSendVoice = (audio: Blob) => {
    setMessages((msgs) => [...msgs, { type: 'audio', audio, id: Date.now() }]);
  };

  // Message action handlers
  const handleLike = () => alert('Liked!');
  const handleReply = () => alert('Reply!');
  const handleCopy = (msg: any) => {
    if (msg.type === 'text') navigator.clipboard.writeText(msg.text);
    else alert('Only text messages can be copied.');
  };
  const handleReport = () => alert('Reported!');

  return (
    <div style={{
      position: 'relative',
      width: 375,
      minHeight: 2324,
      background: '#fff',
      border: '8px solid #000',
      margin: '0 auto',
      overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif',
    }}>
      {/* Fixed Header - iOS-style Progressive Blur Gradient */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 375,
        height: 100,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 16px 24px',
        gap: 20,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.65) 80%, rgba(255,255,255,0.45) 100%)',
        backdropFilter: 'blur(24px)',
        borderRadius: '32px 32px 0px 0px',
        boxSizing: 'border-box',
      }}>
        {/* Left Icon: Google Delete Outline */}
        <div style={{width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2C3851"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </div>
        {/* Title */}
        <span style={{
          width: 247,
          height: 16,
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: 24,
          lineHeight: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          color: '#2C3851',
          flexGrow: 1,
        }}>
          Paper Chat
        </span>
        {/* Right Icon: Google Settings Outline - navigates to room-settings */}
        <div
          style={{width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}
          onClick={() => window.location.assign('/room-settings')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2C3851"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 0, gap: 20,
        position: 'absolute', width: 335, minHeight: 2016,
        left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        marginTop: 100 // push content below header
      }}>
        {/* Date Label */}
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'12px 6px',gap:10,width:136,height:20,background:'#F5F5F5',backdropFilter:'blur(1px)',borderRadius:4,margin:'20px auto'}}>
          <span style={{fontSize:12,lineHeight:'24px',color:'#2C3851',letterSpacing:'-0.02em'}}>Tuesday June 11, 2025</span>
        </div>
        {/* Info Text */}
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'12px 4px',gap:4,width:284,height:20,background:'#F5F5F5',backdropFilter:'blur(1px)',borderRadius:4}}>
          <span style={{fontSize:12,lineHeight:'24px',color:'#2C3851',letterSpacing:'-0.02em'}}>Keep clean and respectful chats at any time.</span>
        </div>
        {/* Main Chat Bubble Example (Dark) */}
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'12px 10px',gap:10,width:335,height:204,background:'rgba(16,30,58,0.8)',backdropFilter:'blur(16px)',borderRadius:8,margin:'20px 0'}}>
          <span style={{fontSize:16,lineHeight:'24px',color:'#fff',letterSpacing:'-0.02em'}}>A grayscale sketch pen drawn illustration of a Chat desktop user interface. There's a large text box at the bottom where a user can type their message. There are multiple chat bubbles above the text box, each containing a message. The background is a light gray. less</span>
        </div>
        {/* Secondary Bubble Example (Light) */}
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'12px 10px',gap:10,width:335,height:60,background:'rgba(16,30,58,0.04)',backdropFilter:'blur(16px)',borderRadius:8}}>
          <span style={{fontSize:16,lineHeight:'24px',color:'#2C3851',letterSpacing:'-0.02em'}}>The Romans, who adopted many Greek beliefs, associated owls with Minerva</span>
        </div>
        {/* Render chat messages */}
        <div style={{width:'100%',margin:'24px 0'}}>
          {messages.map((msg) => {
            const isActive = activeMsgId === msg.id;
            let bubble;
            if (msg.type === 'text') bubble = (
              <div key={msg.id} style={{position:'relative',cursor:'pointer',marginBottom:10,background:'#F5F5F5',borderRadius:8,padding:'12px 16px',maxWidth:260,boxShadow:'0 2px 8px rgba(44,56,81,0.04)'}} onClick={() => setActiveMsgId(isActive ? null : msg.id)}>
                <span style={{fontSize:15,lineHeight:'24px',color:'#2C3851'}}>{msg.text}</span>
                {isActive && (
                  <div style={{position:'absolute',top:'100%',left:0,zIndex:200}}>
                    <MessageActions
                      onLike={handleLike}
                      onReply={handleReply}
                      onCopy={() => handleCopy(msg)}
                      onReport={handleReport}
                    />
                  </div>
                )}
              </div>
            );
            else if (msg.type === 'image') bubble = (
              <div key={msg.id} style={{position:'relative',cursor:'pointer',marginBottom:10,background:'#F5F5F5',borderRadius:8,padding:'12px 16px',maxWidth:260,boxShadow:'0 2px 8px rgba(44,56,81,0.04)'}} onClick={() => setActiveMsgId(isActive ? null : msg.id)}>
                <img src={URL.createObjectURL(msg.file)} alt="img" style={{maxWidth:200, borderRadius:8}} />
                {isActive && (
                  <div style={{position:'absolute',top:'100%',left:0,zIndex:200}}>
                    <MessageActions
                      onLike={handleLike}
                      onReply={handleReply}
                      onCopy={() => handleCopy(msg)}
                      onReport={handleReport}
                    />
                  </div>
                )}
              </div>
            );
            else if (msg.type === 'video') bubble = (
              <div key={msg.id} style={{position:'relative',cursor:'pointer',marginBottom:10,background:'#F5F5F5',borderRadius:8,padding:'12px 16px',maxWidth:260,boxShadow:'0 2px 8px rgba(44,56,81,0.04)'}} onClick={() => setActiveMsgId(isActive ? null : msg.id)}>
                <video controls style={{maxWidth:200, borderRadius:8}} src={URL.createObjectURL(msg.file)} />
                {isActive && (
                  <div style={{position:'absolute',top:'100%',left:0,zIndex:200}}>
                    <MessageActions
                      onLike={handleLike}
                      onReply={handleReply}
                      onCopy={() => handleCopy(msg)}
                      onReport={handleReport}
                    />
                  </div>
                )}
              </div>
            );
            else if (msg.type === 'audio') bubble = (
              <div key={msg.id} style={{position:'relative',cursor:'pointer',marginBottom:10,background:'#F5F5F5',borderRadius:8,padding:'12px 16px',maxWidth:260,boxShadow:'0 2px 8px rgba(44,56,81,0.04)'}} onClick={() => setActiveMsgId(isActive ? null : msg.id)}>
                <audio controls src={URL.createObjectURL(msg.audio)} />
                {isActive && (
                  <div style={{position:'absolute',top:'100%',left:0,zIndex:200}}>
                    <MessageActions
                      onLike={handleLike}
                      onReply={handleReply}
                      onCopy={() => handleCopy(msg)}
                      onReport={handleReport}
                    />
                  </div>
                )}
              </div>
            );
            return bubble;
          })}
        </div>
        {/* Joined/Left Labels */}
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'12px 6px',gap:10,width:161,height:20,background:'#F5F5F5',backdropFilter:'blur(1px)',borderRadius:4,margin:'10px auto'}}>
          <span style={{fontSize:12,lineHeight:'24px',color:'#2C3851',letterSpacing:'-0.02em'}}>Cleopatra joined the chat</span>
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',padding:'12px 6px',gap:10,width:119,height:20,background:'#F5F5F5',backdropFilter:'blur(1px)',borderRadius:4,margin:'10px auto'}}>
          <span style={{fontSize:12,lineHeight:'24px',color:'#2C3851',letterSpacing:'-0.02em'}}>Cesar left the chat</span>
        </div>
      </div>
      <div style={{position:'fixed',left:'50%',bottom:94,transform:'translateX(-50%)'}}>
        <TypingIndicator username="Alex" color="#3DD598" />
      </div>
      {/* Bottom Floating Group - iOS-style Progressive Blur Gradient, with floating group effect */}
      <div style={{position:'fixed',left:'50%',bottom:0,transform:'translateX(-50%)',width:335,background:'linear-gradient(0deg, rgba(255,255,255,0.95) 70%, rgba(255,255,255,0.75) 90%, rgba(255,255,255,0.6) 100%)',backdropFilter:'blur(32px)',borderRadius:'24px 24px 0px 0px',boxShadow:'0 8px 24px 0 rgba(44,56,81,0.10), 0 2px 8px rgba(44,56,81,0.08)'}}>
        <BottomFGGroup
          onSendMessage={handleSendMessage}
          onSendMedia={handleSendMedia}
          onSendVoice={handleSendVoice}
        />
      </div>
    </div>
  );
}
