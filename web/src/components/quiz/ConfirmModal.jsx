import React, { useEffect, useState } from "react";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Ya",
  cancelLabel = "Batal",
  variant = "primary",
  icon,
  onCancel,
  onConfirm,
}) {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
    } else if (visible) {
      setClosing(true);
      const t = setTimeout(() => {
        setVisible(false);
        setClosing(false);
      }, 180); 
      return () => clearTimeout(t);
    }
  }, [open, visible]);

  if (!visible) return null;

  const confirmColorClass =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-500"
      : "bg-indigo-600 hover:bg-indigo-500";

  return (
    <div
      className={`
        fixed inset-0 z-[80] flex items-center justify-center
        bg-black/45 dark:bg-black/60
        ${closing ? "lc-modal-overlay-out" : "lc-modal-overlay-in"}
      `}
    >
      {/* CARD MODAL */}
      <div
        className={`
          w-[92%] max-w-sm
          rounded-3xl border
          bg-white dark:bg-slate-900
          border-slate-200 dark:border-slate-700
          shadow-2xl shadow-black/40
          px-5 py-5
          ${closing ? "lc-modal-card-out" : "lc-modal-card-in"}
        `}
      >
        {/* icon di atas tengah */}
        <div className="flex justify-center mb-3">
          <div
            className={`
              flex h-10 w-10 items-center justify-center rounded-full
              ${variant === "danger"
                ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-200"
                : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200"
              }
            `}
          >
            {icon ?? (
              <span className="text-lg">!</span>
            )}
          </div>
        </div>

        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1 text-center">
          {title}
        </h2>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4 text-center leading-relaxed">
          {description}
        </p>

        <div className="flex justify-end gap-2 text-[11px]">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            className={`px-3 py-1.5 rounded-full text-white ${confirmColorClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
