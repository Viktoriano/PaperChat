"use client";
import React, { useRef, useState } from "react";

export default function VoiceRecorder({ onSend }: { onSend: (audio: Blob) => void }) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(blob));
      onSend(blob);
      chunks.current = [];
    };
    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <button
      type="button"
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      style={{ background: 'transparent', border: 'none', color: '#2C3851', cursor: 'pointer', width: 24, height: 24, fontSize: 20 }}
      title={recording ? 'Recording...' : 'Hold to record'}
    >
      <span className="material-icons-outlined">mic</span>
    </button>
  );
}
