import React, { useEffect, useState } from "react";
import { useTheme } from "./context/ThemeContext";
import { getUserPreferences } from "../api/backendAPI";

import {
  FaMoon,
  FaSun,
  FaDesktop,
  FaMobileAlt,
  FaUserCircle,
} from "react-icons/fa";
import { TbLetterB, TbLetterA } from "react-icons/tb";
import { MdWidthFull, MdWidthNormal } from "react-icons/md";

export default function UserSelector() {
  const { setTheme, setFontSize, setFontMode, setDevice, setLayoutWidth } =
    useTheme();

  const params = new URLSearchParams(window.location.search);
  const userIdFromUrl = params.get("user_id") || "1";

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizePrefs = (raw) => {
    if (!raw) {
      return {
        theme: "light",
        font: "default",
        size: "medium",
        device: "desktop",
        layoutWidth: "fullWidth",
      };
    }

    let fontMode = "default";
    if (raw.fontStyle === "open-dyslexic") fontMode = "dyslexic";
    else if (raw.fontStyle === "serif") fontMode = "serif";

    const layoutWidth = raw.layoutWidth || "fullWidth";
    const device = layoutWidth === "mediumWidth" ? "mobile" : "desktop";

    return {
      theme: raw.theme || "light",
      font: fontMode,
      size: raw.fontSize || "medium",
      device,
      layoutWidth,
    };
  };

  const buildIcons = (pref) => {
    const icons = [];

    icons.push(
      pref.theme === "dark" ? (
        <FaMoon key="theme" size={14} className="text-sky-400" />
      ) : (
        <FaSun key="theme" size={14} className="text-amber-400" />
      )
    );

    icons.push(
      pref.device === "mobile" ? (
        <FaMobileAlt key="device" size={14} className="text-emerald-400" />
      ) : (
        <FaDesktop key="device" size={14} className="text-indigo-400" />
      )
    );

    if (pref.font === "dyslexic") {
      icons.push(
        <TbLetterB key="font" size={14} className="text-sky-300" />
      );
    } else if (pref.font === "serif") {
      icons.push(
        <TbLetterA key="font" size={14} className="text-emerald-300 italic" />
      );
    } else {
      icons.push(
        <TbLetterA key="font" size={14} className="text-slate-400" />
      );
    }

    let sizeClass = "";
    if (pref.size === "small") sizeClass = "scale-75";
    else if (pref.size === "large") sizeClass = "scale-110";

    icons.push(
      <TbLetterA
        key="size"
        size={14}
        className={`text-slate-300 ${sizeClass}`}
      />
    );

    return icons;
  };

  const applyUserPrefsToTheme = (pref) => {
    setTheme(pref.theme);
    setFontMode(pref.font);
    setFontSize(pref.size);
    setDevice(pref.device);
    setLayoutWidth(pref.layoutWidth);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const rawPref = await getUserPreferences(userIdFromUrl);
        const pref = normalizePrefs(rawPref);

        const userObj = {
          id: userIdFromUrl,
          name: `User ${userIdFromUrl}`,
          ...pref,
          icons: buildIcons(pref),
        };

        setUser(userObj);
        applyUserPrefsToTheme(pref);
      } catch (e) {
        console.error(e);
        setError("Gagal memuat preferensi pengguna");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userIdFromUrl]);

  if (loading) {
    return (
      <button
        className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl shadow-sm text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2"
        disabled
      >
        <FaUserCircle className="text-indigo-400" size={16} />
        <span>Memuat user...</span>
      </button>
    );
  }

  if (error || !user) {
    return (
      <div className="px-3 py-2 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 rounded-xl text-xs text-red-700 dark:text-red-300">
        {error || "Gagal memuat user"}
      </div>
    );
  }

  const activeUser = user;

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
            group
            px-3 py-2
            bg-white dark:bg-slate-800
            border border-slate-300 dark:border-slate-600
            rounded-xl
            shadow-sm
            text-xs text-slate-700 dark:text-slate-200
            flex items-center gap-2
            hover:bg-slate-50 dark:hover:bg-slate-700
            hover:border-indigo-300/70 dark:hover:border-indigo-400/70
            hover:shadow-md
            active:scale-[0.97]
            transition-all duration-150 ease-out
          "
      >
        <FaUserCircle className="text-indigo-400 group-hover:text-indigo-500 transition-colors" size={16} />

        <span className="font-medium">
          {activeUser?.name || "Pengguna"}
        </span>

        <span className="text-[10px] ml-1 group-hover:translate-y-[1px] transition-transform">
          ▾
        </span>
      </button>

      {/* DROPDOWN */}
      {open && activeUser && (
        <div
          className="
      absolute right-0 mt-2 w-80
      bg-white dark:bg-slate-900
      border border-slate-200 dark:border-slate-700
      rounded-xl shadow-lg z-50 p-4
      lc-menu-pop
    "
        >
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
            Pengguna Aktif
          </h3>

          <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 mb-3">
            <span>{activeUser.name}</span>
            <span className="flex gap-1 text-[13px]">
              {activeUser.icons.map((iconEl, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center"
                >
                  {iconEl}
                </span>
              ))}
            </span>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-3 text-[10px] text-slate-500 dark:text-slate-400">
            <h4 className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-2">
              Preference Pengguna Aktif
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {/* Theme */}
              <div className="flex items-center gap-2">
                {activeUser.theme === "dark" ? (
                  <FaMoon className="text-sky-400" size={12} />
                ) : (
                  <FaSun className="text-amber-400" size={12} />
                )}
                <span>
                  Theme:{" "}
                  <span className="font-semibold capitalize">
                    {activeUser.theme}
                  </span>
                </span>
              </div>

              {/* Font Style */}
              <div className="flex items-center gap-2">
                {activeUser.font === "dyslexic" ? (
                  <TbLetterB className="text-sky-300" size={12} />
                ) : activeUser.font === "serif" ? (
                  <TbLetterA
                    className="text-emerald-300 italic"
                    size={12}
                  />
                ) : (
                  <TbLetterA className="text-slate-400" size={12} />
                )}
                <span>
                  Font:{" "}
                  <span className="font-semibold">
                    {activeUser.font === "dyslexic"
                      ? "OpenDyslexic"
                      : activeUser.font === "serif"
                        ? "Serif"
                        : "Default"}
                  </span>
                </span>
              </div>

              {/* Font Size */}
              <div className="flex items-center gap-2">
                {activeUser.size === "small" ? (
                  <TbLetterA className="text-slate-400" size={10} />
                ) : activeUser.size === "large" ? (
                  <TbLetterA className="text-slate-200" size={14} />
                ) : (
                  <TbLetterA className="text-slate-300" size={12} />
                )}
                <span>
                  Text Size:{" "}
                  <span className="font-semibold capitalize">
                    {activeUser.size}
                  </span>
                </span>
              </div>

              {/* Layout Width */}
              <div className="flex items-center gap-2">
                {activeUser.layoutWidth === "fullWidth" ? (
                  <MdWidthFull className="text-indigo-400" size={14} />
                ) : (
                  <MdWidthNormal className="text-indigo-300" size={14} />
                )}
                <span>
                  Layout:{" "}
                  <span className="font-semibold">
                    {activeUser.layoutWidth === "fullWidth"
                      ? "Full width"
                      : "Medium width"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
