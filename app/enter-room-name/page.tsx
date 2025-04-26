"use client";
import EnterRoomNamePage from "../components/home/EnterRoomNamePage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EnterRoomNameScreen() {
  const [userName, setUserName] = useState<string|null>(null);
  const router = useRouter();

  // Simulate fetching user profile (replace with real logic)
  useEffect(() => {
    // For demo: set to null to require name, or a string to skip
    setUserName(null); // <-- Set to 'Viktor' to simulate registered user
  }, []);

  const handleComplete = (roomName: string) => {
    if (userName) {
      // User is registered, skip name selection, go to room created
      router.push("/room-created");
    } else {
      // User not registered, go to enter name screen
      router.push("/enter-name");
    }
  };

  // If user is registered, skip this screen and go directly (simulate)
  useEffect(() => {
    if (userName) {
      router.push("/room-created");
    }
  }, [userName, router]);

  // Only show EnterRoomNamePage if user is not registered
  if (userName === null) {
    return <EnterRoomNamePage onComplete={handleComplete} />;
  }
  return null;
}
