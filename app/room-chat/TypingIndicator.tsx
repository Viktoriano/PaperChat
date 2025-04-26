import React from "react";

interface TypingIndicatorProps {
  username: string;
  color?: string;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ username, color = "#3DD598" }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: 24,
        bottom: 94,
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 1100,
        background: "rgba(255,255,255,0.85)",
        borderRadius: 16,
        padding: "8px 16px 8px 8px",
        boxShadow: "0 2px 8px rgba(44,56,81,0.08)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Color dot */}
      <span
        style={{
          display: "inline-block",
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: color,
          marginRight: 4,
        }}
      />
      {/* Username */}
      <span
        style={{
          fontWeight: 500,
          color: "#2C3851",
          fontSize: 14,
          marginRight: 8,
        }}
      >
        {username}
      </span>
      {/* Animated floating squares - Pinterest style, responsive to username and screen size */}
      <span
        style={{
          position: "relative",
          display: "inline-block",
          width: `calc(min(100vw, 375px) * 0.65 + ${username.length * 0.48}em)`, // responsive width
          minWidth: 64,
          maxWidth: 320,
          height: 18,
          verticalAlign: "middle"
        }}
      >
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `calc(${6 + i * ((username.length * 9 + 40) / 20)}px)` ,
              bottom: `${4 + 6 * Math.sin(i / 2 + 0.2)}px`,
              width: "clamp(6px, 2vw, 12px)",
              height: "clamp(6px, 2vw, 12px)",
              borderRadius: 2,
              background: "#2C3851",
              opacity: 0.9,
              animation: `floatSquare 1.4s linear infinite`,
              animationDelay: `${i * 0.06}s`,
              transition: 'width 0.2s',
            }}
          />
        ))}
        <style>{`
          @keyframes floatSquare {
            0% { transform: translateY(0px); opacity: 0.7; }
            20% { opacity: 1; }
            50% { transform: translateY(-8px); opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(0px); opacity: 0.7; }
          }
        `}</style>
      </span>
      <style>{`
        @keyframes typing-bounce {
          0%, 80%, 100% { transform: scale(1); opacity: 0.7; }
          40% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TypingIndicator;
