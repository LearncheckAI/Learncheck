import React from "react";
import { FaRedo } from "react-icons/fa";

export default function QuizFooter({
  submitted,
  currentIndex,
  total,
  onPrev,
  onNext,
  onSubmit,
  onRetake,
  onFinish,
  onOpenConfirmSubmit,
  onOpenConfirmRetake,
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
      {/* LEFT */}
      <div className="flex gap-2">
        {submitted && (
          <button
            onClick={onOpenConfirmRetake ?? onRetake}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-indigo-500"
          >
            <FaRedo className="text-[11px]" />
            Ulangi Kuis
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-xs md:text-sm ${isFirst
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
        >
          Sebelumnya
        </button>

        {/* === MODE BELUM SUBMIT === */}
        {!submitted && !isLast && (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-xs md:text-sm"
          >
            Selanjutnya →
          </button>
        )}

        {!submitted && isLast && (
          <button
            onClick={onOpenConfirmSubmit ?? onSubmit}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs md:text-sm font-semibold"
          >
            Kumpulkan Jawaban
          </button>
        )}

        {/* === MODE SUDAH SUBMIT (REVIEW) === */}
        {submitted && !isLast && (
          <button
            onClick={onNext}
            className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-xs md:text-sm"
          >
            Selanjutnya →
          </button>
        )}

        {submitted && isLast && (
          <button
            onClick={onFinish}
            className="px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 text-xs md:text-sm font-semibold"
          >
            Selesai →
          </button>
        )}
      </div>
    </div>
  );
}
