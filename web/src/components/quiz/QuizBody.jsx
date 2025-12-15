import React from "react";
import { FaRobot } from "react-icons/fa";

export default function QuizBody({
  question,
  answers,
  submitted,
  onSelect,
}) {
  if (!question) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Tidak ada soal tersedia.
      </p>
    );
  }

  const isMulti = question.isMulti;

  const rawSelected = answers[question.id];
  const selectedAnswers = isMulti
    ? Array.isArray(rawSelected)
      ? rawSelected
      : typeof rawSelected === "number"
        ? [rawSelected]
        : []
    : rawSelected ?? null;

  return (
    <div className="space-y-5 lc-animate-fade-in-up">
      {/* PERTANYAAN */}
      <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 px-4 py-4 md:px-5 md:py-5 dark:border-slate-700/80 dark:bg-slate-900/80">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <span className="inline-block h-5 w-5 rounded-full bg-indigo-600 text-[10px] text-white flex items-center justify-center">
              ?
            </span>
            <span>
              Pertanyaan ·{" "}
              <span className="font-medium">
                {isMulti ? "Multiple Answer" : "Multiple Choice"}
              </span>
            </span>
          </div>
        </div>

        <p className="text-[15px] md:text-base leading-relaxed text-slate-900 dark:text-slate-50">
          {question.text}
        </p>
      </div>

      {/* OPSI */}
      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          const selected = isMulti
            ? selectedAnswers.includes(idx)
            : selectedAnswers === idx;

          const isCorrect =
            submitted &&
            (isMulti
              ? question.correctAnswers.includes(idx)
              : idx === question.correctAnswer);

          const isWrong = submitted && selected && !isCorrect;

          let borderClass = "border-slate-200/80 dark:border-slate-700/80";
          let bgClass =
            "bg-white/95 dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800";
          let textClass = "text-slate-800 dark:text-slate-100";

          if (selected && !submitted) {
            borderClass = "border-indigo-400";
            bgClass =
              "bg-indigo-50/80 dark:bg-indigo-900/40 hover:bg-indigo-100/80 dark:hover:bg-indigo-800/60";
          }

          if (submitted) {
            if (isCorrect) {
              borderClass = "border-emerald-500";
              bgClass = "bg-emerald-50/90 dark:bg-emerald-900/40";
            } else if (isWrong) {
              borderClass = "border-rose-500";
              bgClass = "bg-rose-50/90 dark:bg-rose-900/40";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(question, idx)}
              className={`w-full text-left rounded-2xl border ${borderClass} ${bgClass} ${textClass} text-[14px] md:text-sm flex gap-3 items-center px-4 py-3 md:px-5 md:py-3.5 transition transform hover:-translate-y-[1px]`}
            >
              {/* CHECKBOX MULTI / BULATAN SINGLE */}
              {isMulti ? (
                <span
                  className={`h-5 w-5 rounded-md border flex items-center justify-center text-[10px] ${selected
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "border-slate-400 dark:border-slate-600"
                    }`}
                >
                  {selected ? "✓" : ""}
                </span>
              ) : (
                <span
                  className={`h-5 w-5 rounded-full border flex items-center justify-center text-[10px] ${selected
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "border-slate-400 dark:border-slate-600"
                    }`}
                />
              )}

              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* PENJELASAN */}
      {submitted && question.explanation && (
        <div className="mt-2 rounded-2xl border border-indigo-200/70 dark:border-indigo-700/70 bg-gradient-to-r from-indigo-50 via-slate-50 to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/80 p-4 flex gap-3 items-start shadow-sm">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30">
            <FaRobot className="text-lg" />
          </div>

          <div className="flex-1 space-y-1 lc-animate-explain">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
              Feedback dari AI
            </p>
            <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {question.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
