"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const RoomQRCodePage = dynamic(() => import("../components/home/RoomQRCodePage"), { ssr: false });

export default function RoomQRPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId") || "81313189";
  const roomName = searchParams.get("roomName") || "Room Name";
  return <RoomQRCodePage roomId={roomId} roomName={roomName} />;
}
