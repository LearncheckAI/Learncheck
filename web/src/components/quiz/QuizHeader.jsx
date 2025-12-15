import React from "react";
import { FaRobot, FaEye } from "react-icons/fa";
import TimerCircle from "./TimerCircle";
import { useTheme } from "../context/ThemeContext";

export default function QuizHeader({
  currentIndex,
  total,
  submitted,
  score,
  timeLeft,
  totalTime,
}) {
  const { theme } = useTheme() || { theme: "dark" };
  const isDark = theme === "dark";

  const questionNumber = total ? currentIndex + 1 : 0;
  const progress = total ? ((currentIndex + 1) / total) * 100 : 0;

  const secondsLeft =
    typeof timeLeft === "number" && isFinite(timeLeft) ? timeLeft : null;

  const showTimer = secondsLeft !== null && totalTime;

  const isCritical = secondsLeft !== null && secondsLeft <= 15;
  const isWarning = !isCritical && secondsLeft !== null && secondsLeft <= 60;

  const formatTime = (secRaw) => {
    if (typeof secRaw !== "number" || !isFinite(secRaw)) return "--:--";
    const sec = Math.max(0, Math.floor(secRaw));
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="mb-6 space-y-3 lc-animate-fade-in-up">
      {/* === ROW 1: BRAND CHIP + TIMER PILL === */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Brand chip */}
        <div
          className={`
          inline-flex items-center gap-2.5
          px-4 py-2
          rounded-full
          text-[12px] font-semibold
          border shadow-sm transition-all
          ${isDark
              ? "border-indigo-500/40 bg-indigo-950/60 text-indigo-100"
              : "border-indigo-200 bg-indigo-50 text-indigo-700"
            }
          `}
        >
          <FaRobot className="text-[13px]" />
          <span>LearnCheck · AI Quiz</span>
        </div>

        {/* Timer pill */}
        {showTimer && (
          <div
            className={`
              inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium
              border
              ${isCritical
                ? isDark
                  ? "bg-rose-900/50 border-rose-500/80 text-rose-100"
                  : "bg-rose-50 border-rose-300 text-rose-800"
                : isWarning
                  ? isDark
                    ? "bg-amber-900/40 border-amber-500/70 text-amber-100"
                    : "bg-amber-50 border-amber-300 text-amber-800"
                  : isDark
                    ? "bg-slate-900/80 border-slate-700 text-slate-100"
                    : "bg-white border-slate-200 text-slate-700"
              }
            `}
          >
            <TimerCircle timeLeft={secondsLeft} totalTime={totalTime} />
            <span className="font-mono text-[11px] tabular-nums">
              {formatTime(secondsLeft)}
            </span>
          </div>
        )}
      </div>

      {/* === ROW 2: PERTANYAAN PILL + MODE / SKOR === */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Pertanyaan X / Y pill */}
        <div
          className={`
            inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px]
            border
            ${isDark
              ? "bg-slate-900/70 border-slate-700 text-slate-100"
              : "bg-slate-100/90 border-slate-200 text-slate-700"
            }
          `}
        >
          <span className="h-1.5 w-6 rounded-full bg-indigo-500/80" />
          <span>
            Pertanyaan{" "}
            <span className="font-semibold">{questionNumber}</span>
            <span className="opacity-70"> / {total}</span>
          </span>
        </div>

        {/* Kanan: mode + skor */}
        <div className="flex flex-wrap items-center gap-2">
          {submitted && (
            <span
              className={`
                inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium
                border
                ${isDark
                  ? "bg-slate-900/70 border-slate-700 text-slate-100"
                  : "bg-slate-50 border-slate-200 text-slate-700"
                }
              `}
            >
              <FaEye className="text-[10px]" />
              <span>Mode review</span>
            </span>
          )}

          {submitted && score && (
            <span
              className={`
                inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium
                border
                ${isDark
                  ? "bg-emerald-900/40 border-emerald-600/70 text-emerald-100"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
                }
              `}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Skor:{" "}
                <span className="font-semibold">
                  {score.correct} / {score.total}
                </span>
              </span>
            </span>
          )}
        </div>
      </div>

      {/* === PROGRESS BAR === */}
      <div className="space-y-1">
        <div className="h-1.5 w-full rounded-full bg-slate-200/80 dark:bg-slate-700/40 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progress || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
