import React from "react";
import UserSelector from "./UserSelector";
import { useTheme } from "./context/ThemeContext";

export default function Header() {
  const { theme, layoutWidth } = useTheme();

  const widthClass =
    layoutWidth === "fullWidth"
      ? "max-w-full px-3 sm:px-6"
      : "max-w-6xl px-3 sm:px-4";

  return (
    <header
      className={`
        w-full sticky top-0 z-50
        backdrop-blur-md
        border-b transition-colors
        ${theme === "dark"
          ? "bg-slate-900/70 border-slate-800/60"
          : "bg-white/70 border-slate-200/70 shadow-sm"}
      `}
    >
      <div
        className={`
          ${widthClass}
          mx-auto
          py-2 sm:py-3
          flex items-center justify-between gap-2
        `}
      >
        {/* Logo + title */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="
              h-8 w-8 rounded-xl 
              bg-gradient-to-br from-indigo-500 to-indigo-700
              dark:from-indigo-600 dark:to-indigo-800
              flex items-center justify-center
              text-white font-bold text-sm
              shadow-md shadow-indigo-500/20
              flex-shrink-0
            "
          >
            L
          </div>

          {/* Text brand: sembunyi di layar kecil, muncul di ≥ sm */}
          <span
            className={`
              hidden sm:inline-block
              text-base sm:text-lg font-semibold truncate
              ${theme === "dark" ? "text-slate-100" : "text-slate-900"}
            `}
          >
            LearnCheck!
          </span>
        </div>

        {/* User Selector – dipaksa rapih di kanan */}
        <div className="flex-shrink-0">
          <UserSelector />
        </div>
      </div>
    </header>
  );
}
