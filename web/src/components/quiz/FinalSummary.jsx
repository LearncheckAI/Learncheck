import React, { useEffect, useState } from "react";
import { FaRobot, FaCheckCircle, FaHistory, FaRedo } from "react-icons/fa";

export default function FinalSummary({ score, total, history = [], onRetake }) {
  const [showHistory, setShowHistory] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [historyClosing, setHistoryClosing] = useState(false);

  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 1000;

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPercent(Math.round(percent * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  let headline = "";
  let subtext = "";
  let levelLabel = "";
  let levelColorClass = "";

  if (percent >= 85) {
    headline = "Kerennn, kamu udah paham banget! 🚀";
    subtext =
      "Skor kamu sudah sangat baik. Lanjutkan ke materi berikutnya atau gunakan kuis ini untuk review cepat.";
    levelLabel = "Expert";
    levelColorClass =
      "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:border-emerald-600/70";
  } else if (percent >= 70) {
    headline = "Mantap, tinggal diasah dikit lagi 💪";
    subtext =
      "Kamu sudah menguasai sebagian besar konsepnya. Coba baca ulang bagian yang masih bikin ragu lalu ulangi kuis.";
    levelLabel = "Solid";
    levelColorClass =
      "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-600/70";
  } else if (percent >= 50) {
    headline = "Oke, fondasinya mulai kebentuk 📚";
    subtext =
      "Dasarnya sudah mulai nyangkut, tapi masih ada beberapa bagian yang perlu diulang pelan-pelan.";
    levelLabel = "Growing";
    levelColorClass =
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-600/70";
  } else {
    headline = "Masih bisa ditingkatkan lagi 🌱";
    subtext =
      "Tidak apa-apa, proses belajar memang bertahap. Coba pelajari lagi materi sebelumnya dan gunakan kuis ini sebagai latihan.";
    levelLabel = "Starter";
    levelColorClass =
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/60 dark:text-slate-100 dark:border-slate-700";
  }

  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  const last = sortedHistory[0];

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* CHIP */}
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-3 py-1 text-[11px] font-medium text-indigo-700 shadow-sm dark:border-indigo-500/40 dark:bg-indigo-900/40 dark:text-indigo-200">
        <FaRobot className="text-xs" />
        <span>LearnCheck · Hasil Formative Assessment</span>
      </div>

      {/* CARD UTAMA */}
      <div className="w-full md:max-w-3xl mx-auto">
        <div
          className={`
            relative overflow-hidden
            rounded-[28px]
            border border-slate-200/80 bg-white/95
            p-6 md:p-7
            shadow-[0_18px_60px_rgba(15,23,42,0.12)]
            dark:border-slate-700/80 dark:bg-slate-950/85
          `}
        >
          <div className="pointer-events-none absolute -top-20 inset-x-12 h-40 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center md:items-stretch gap-6">
            {/* PROGRESS CIRCLE + LEVEL */}
            <div className="flex flex-col items-center justify-center md:w-1/3 space-y-3">
              <div className="relative h-32 w-32 lc-animate-pop-card">
                <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-900/80" />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#4f46e5 ${animatedPercent * 3.6
                      }deg, rgba(148,163,184,0.25) 0deg)`,
                  }}
                />
                <div className="absolute inset-3 rounded-full bg-white/95 dark:bg-slate-950 flex flex-col items-center justify-center shadow-inner shadow-slate-900/10">
                  <span className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Skor
                  </span>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
                    {animatedPercent}%
                  </span>
                </div>
              </div>

              {/* level badge */}
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium ${levelColorClass}`}
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                <span>Level pemahaman: {levelLabel}</span>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {score} jawaban benar dari {total} soal
              </p>
            </div>

            {/* TEKS INSIGHT */}
            <div className="flex-1 text-left space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500" />
                  <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {headline}
                  </h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {subtext}
              </p>

              {/* BOX REKOMENDASI */}
              <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50/90 px-3 py-3 text-[12px] text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                <p className="font-semibold mb-1 text-slate-700 dark:text-slate-200">
                  Rekomendasi:
                </p>
                {percent >= 85 ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Coba tantang diri dengan materi lanjutan atau studi
                      kasus yang lebih kompleks.
                    </li>
                    <li>
                      Gunakan kuis ini sebagai review cepat sebelum lanjut ke
                      topik berikutnya.
                    </li>
                  </ul>
                ) : percent >= 70 ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Tandai soal yang tadi salah, lalu cari kembali
                      penjelasannya di materi.
                    </li>
                    <li>
                      Ulangi kuis setelah membaca ulang agar konsepnya makin
                      nempel.
                    </li>
                  </ul>
                ) : percent >= 50 ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Fokus ke bagian materi yang paling sering bikin salah
                      dulu, jangan semuanya sekaligus.
                    </li>
                    <li>
                      Ulangi kuis setelah membaca ulang satu bagian materi
                      tertentu dulu.
                    </li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Fokus dulu pada definisi dasar dan contoh sederhana di
                      materi.
                    </li>
                    <li>
                      Jawab kuis pelan-pelan, baca setiap penjelasan jawaban
                      yang muncul setelah submit.
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* TOMBOL ULANGI */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onRetake}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs md:text-sm font-medium text-white hover:bg-indigo-500"
            >
              <FaRedo className="text-[11px]" />
              Ulangi Kuis
            </button>

            <button
              type="button"
              onClick={() => {
                if (showHistory) {
                  setHistoryClosing(true);
                  setTimeout(() => {
                    setShowHistory(false);
                    setHistoryClosing(false);
                  }, 200);
                } else {
                  setShowHistory(true);
                }
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs md:text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <FaHistory className="text-[11px]" />
              {showHistory ? "Tutup riwayat" : "Lihat riwayat kuis"}
            </button>
          </div>

          {/* RIWAYAT KUIS */}
          {showHistory && (
            <div
              className={`
                mt-4
                rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3
                text-[11px] text-slate-600
                dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 text-left
                ${historyClosing ? "lc-history-out" : "lc-history-in"}
              `}
            >
              <p className="font-semibold mb-2 text-slate-700 dark:text-slate-200">
                Riwayat percobaan kuis
              </p>

              {sortedHistory.length === 0 ? (
                <p className="italic text-slate-400">
                  Belum ada riwayat percobaan lain pada kuis ini.
                </p>
              ) : (
                <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                  {sortedHistory.map((item, idx) => {
                    const t = new Date(item.timestamp);
                    const label = t.toLocaleString();
                    const pct =
                      item.total > 0
                        ? Math.round((item.correct / item.total) * 100)
                        : 0;

                    return (
                      <li
                        key={item.timestamp + "-" + idx}
                        className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/60"
                      >
                        <span className="flex-1">
                          Percobaan {sortedHistory.length - idx}
                          <span className="hidden sm:inline"> · {label}</span>
                        </span>
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                          {item.correct}/{item.total} ({pct}%)
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
