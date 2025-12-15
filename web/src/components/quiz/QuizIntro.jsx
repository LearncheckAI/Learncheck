import React from "react";
import { FaRobot, FaPlay, FaListUl, FaClock } from "react-icons/fa";

export default function QuizIntro({ total, onStart }) {
  const totalQuestions = total || 3;

  return (
    <div className="flex flex-col items-center gap-6 text-center lc-animate-fade-in-up">
      {/* CHIP */}
      <div className="lc-animate-seq-1 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-3 py-1 text-[11px] font-medium text-indigo-700 shadow-sm dark:border-indigo-500/40 dark:bg-indigo-900/40 dark:text-indigo-200">
        <FaRobot className="text-xs" />
        <span>LearnCheck · Kuis adaptif berbasis AI</span>
      </div>

      {/* CARD UTAMA */}
      <div className="w-full md:max-w-3xl mx-auto">
        <div
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-slate-200/80 bg-slate-50/95
            p-6 md:p-8
            shadow-lg shadow-slate-900/10
            dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-black/20
          "
        >
          {/* ICON + JUDUL + DESKRIPSI */}
          <div className="relative flex flex-col items-center gap-4 mb-5">
            {/* ICON */}
            <div className="lc-animate-seq-2 flex items-center justify-center">
              <div className="bg-gradient-to-tr from-indigo-500 to-sky-500 p-[2px] rounded-3xl shadow-md shadow-indigo-500/40">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-white lc-soft-pulse-once">
                  <FaRobot className="text-2xl" />
                </div>
              </div>
            </div>

            {/* JUDUL & TEKS PENDEK */}
            <div className="lc-animate-seq-3 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Siap{" "}
                <span className="text-indigo-600 dark:text-indigo-300">
                  mulai kuis
                </span>
                ?
              </h2>

              <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300/85 max-w-md mx-auto">
                Cek seberapa paham kamu dengan materi yang baru saja kamu
                pelajari, tanpa tekanan nilai.
              </p>
            </div>

            {/* INFO SINGKAT: JUMLAH SOAL */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="
                  inline-flex items-center gap-2 rounded-full px-3 py-1 border
                  bg-slate-100 text-slate-700 border-slate-200
                  dark:bg-slate-900/60 dark:text-slate-100 dark:border-slate-700
                "
              >
                <FaListUl className="text-[10px] text-slate-500 dark:text-slate-200" />
                <span className="font-medium">
                  {totalQuestions} soal · pilihan ganda & multiple answer
                </span>
              </div>

              {/* PERKIRAAN WAKTU PENGERJAAN */}
              <div
                className="
                  inline-flex items-center gap-2 rounded-full px-3 py-1
                  text-[11px] font-medium
                  bg-slate-50 text-slate-600 border border-slate-200
                  dark:bg-slate-900/70 dark:text-slate-200 dark:border-slate-700
                "
              >
                <FaClock className="text-[10px] text-slate-500 dark:text-slate-300" />
                <span>Perkiraan waktu pengerjaan: ±3–5 menit</span>
              </div>
            </div>
          </div>

          {/* GARIS PEMISAH */}
          <div className="relative mb-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/70 to-transparent dark:via-slate-700/80" />
          </div>

          {/* BOX INFO: CARA PAKAI & CATATAN */}
          <div className="relative flex flex-col gap-2 mb-5 text-[11px] text-slate-600 dark:text-slate-300">
            <div className="lc-animate-seq-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Cara pakai */}
              <div
                className="
                  rounded-2xl border border-slate-200/70 bg-white/90 px-3 py-2 text-left
                  dark:border-slate-700 dark:bg-slate-900/70
                  transition-colors duration-200
                  hover:border-indigo-300 hover:bg-slate-50
                  dark:hover:border-indigo-500/60 dark:hover:bg-slate-900
                "
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200 mb-1">
                  Cara pakai
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Jawab dengan santai, lalu baca penjelasan AI setelah submit.
                </p>
              </div>

              {/* Catatan */}
              <div
                className="
                  rounded-2xl border border-slate-200/70 bg-white/90 px-3 py-2 text-left
                  dark:border-slate-700 dark:bg-slate-900/70
                  transition-colors duration-200
                  hover:border-indigo-300 hover:bg-slate-50
                  dark:hover:border-indigo-500/60 dark:hover:bg-slate-900
                "
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200 mb-1">
                  Catatan
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Hasil kuis ini hanya untuk kamu sendiri, tidak mempengaruhi
                  nilai akhir.
                </p>
              </div>
            </div>
          </div>

          {/* TOMBOL MULAI */}
          <div className="relative mt-1 flex justify-center lc-animate-seq-5">
            <button
              type="button"
              onClick={onStart}
              className="
                group inline-flex items-center gap-2 rounded-full
                bg-indigo-600 px-6 py-2.5
                text-xs md:text-sm font-medium text-white
                shadow-md shadow-indigo-500/40
                hover:bg-indigo-500
                active:scale-[0.97]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900
                transition-all
              "
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/80 group-hover:translate-x-[1px] transition-transform">
                <FaPlay className="text-[11px]" />
              </span>
              <span className="group-hover:translate-x-[1px] transition-transform">
                Mulai Kuis
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
