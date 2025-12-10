import React from "react";

export default function QuizShell({ children }) {
  return (
    <div className="relative">
      <div
        className="
          pointer-events-none absolute inset-0 rounded-[32px]
          bg-gradient-to-br from-white/20 via-white/5 to-transparent
          dark:from-sky-500/10 dark:via-indigo-500/5 dark:to-transparent
          blur-2xl opacity-80
        "
      />

      {/* MAIN CARD */}
      <div
        className="
          relative rounded-[32px]
          border border-white/30 dark:border-white/10
          bg-white/40 dark:bg-slate-900/30
          backdrop-blur-xl
          shadow-[0_18px_45px_rgba(15,23,42,0.25)]
          dark:shadow-[0_28px_80px_rgba(0,0,0,0.8)]
          p-6 md:p-8
          lc-animate-pop-card
        "
      >
        {children}
      </div>
    </div>
  );
}
