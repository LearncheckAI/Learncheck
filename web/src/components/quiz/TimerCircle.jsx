import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function TimerCircle({ timeLeft, totalTime }) {
  const { theme } = useTheme() || { theme: "dark" };

  if (typeof timeLeft !== "number" || !totalTime) return null;

  const radius = 16;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;

  const clamped = Math.max(0, Math.min(timeLeft, totalTime));
  const progress = clamped / totalTime;
  const strokeOffset = circumference - progress * circumference;

  const isCritical = clamped <= 15;
  const isWarning = !isCritical && clamped <= 60;

  let ringColor = "#6366f1"; 
  if (isWarning) ringColor = "#fb923c"; 
  if (isCritical) ringColor = "#ef4444";

  const isDark = theme === "dark";
  const bgRingColor = isDark
    ? "rgba(148,163,184,0.45)"
    : "rgba(148,163,184,0.5)";

  const wrapperClass =
    isCritical || isWarning
      ? "flex items-center justify-center animate-pulse"
      : "flex items-center justify-center";

  return (
    <div className={wrapperClass}>
      <svg
        className="h-7 w-7 md:h-8 md:w-8"
        viewBox="0 0 40 40"
        aria-hidden="true"
      >
        {/* background ring */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke={bgRingColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* progress ring */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          style={{ transition: "stroke-dashoffset 0.35s ease-out" }}
          transform="rotate(-90 20 20)"  
        />
      </svg>
    </div>
  );
}
