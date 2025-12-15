import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useTheme } from "../components/context/ThemeContext";
import { generateQuiz } from "../api/backendAPI";
import { useLocalState } from "../hooks/useLocalState";

import QuizHeader from "../components/quiz/QuizHeader";
import QuizBody from "../components/quiz/QuizBody";
import QuizFooter from "../components/quiz/QuizFooter";
import FinalSummary from "../components/quiz/FinalSummary";
import QuizIntro from "../components/quiz/QuizIntro";
import QuizShell from "../components/quiz/QuizShell";
import ConfirmModal from "../components/quiz/ConfirmModal";

// untuk mengatur waktu 
const QUIZ_DURATION = 5 * 60;

export default function QuizPage({ onBackToClass }) {
  const params = new URLSearchParams(window.location.search);
  const tutorialId = params.get("tutorial_id") || "35363";
  const userId = params.get("user_id") || "1";

  const { layoutWidth } = useTheme() || {
    theme: "dark",
    layoutWidth: "fullWidth",
  };

  const [reloadKey, setReloadKey] = useState(0);

  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [confirmRetakeOpen, setConfirmRetakeOpen] = useState(false);

  const storageKey = `quiz_state_${userId}_${tutorialId}`;

  const [state, setState] = useLocalState(storageKey, {
    quiz: null,
    loading: true,
    error: null,
    currentIndex: 0,
    answers: {},
    submitted: false,
    score: null,
    validationError: "",
    hasStarted: false,
    showSummary: false,
  });

  const historyKey = `quiz_history_${userId}_${tutorialId}`;
  const [quizHistory, setQuizHistory] = useLocalState(historyKey, []);

  const { showSummary } = state;

  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);

  const {
    quiz,
    loading,
    error,
    currentIndex,
    answers,
    submitted,
    score,
    validationError,
    hasStarted: startedFlag,
  } = state;

  const hasStarted = startedFlag ?? false;

  const normalizeQuestions = (rawQuestions) => {
    if (!Array.isArray(rawQuestions)) return [];

    return rawQuestions.map((q, i) => {
      const options = q.options || [];

      const isMulti =
        q.type === "multiple_answer" ||
        (Array.isArray(q.correctAnswers) && q.correctAnswers.length > 1);

      let correctAnswers = [];
      if (Array.isArray(q.correctAnswers)) {
        correctAnswers = q.correctAnswers.filter(
          (idx) => typeof idx === "number" && idx >= 0 && idx < options.length
        );
      }

      const correctAnswer =
        !isMulti && correctAnswers.length > 0 ? correctAnswers[0] : null;

      return {
        id: q.id ?? String(i),
        text: q.question || q.text || `Pertanyaan ${i + 1}`,
        options,
        isMulti,
        correctAnswers,
        correctAnswer,
        explanation: q.explanation || "",
      };
    });
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (state.quiz && Array.isArray(state.quiz.questions)) {
          setState((p) => ({ ...p, loading: false }));
          return;
        }

        setState((p) => ({ ...p, loading: true, error: null }));

        const data = await generateQuiz(tutorialId);

        const questions = normalizeQuestions(
          Array.isArray(data) ? data : data.questions || []
        );

        if (!questions.length) {
          throw new Error("Quiz kosong atau format tidak dikenal.");
        }

        setState((p) => ({
          ...p,
          quiz: { questions },
          loading: false,
        }));
      } catch (err) {
        console.error(err);
        setState((p) => ({
          ...p,
          loading: false,
          error: err.message || "Gagal memuat quiz.",
        }));
      }
    };

    fetchQuiz();
  }, [tutorialId, userId, reloadKey]);

  const questions = quiz?.questions || [];
  const total = questions.length;
  const currentQuestion = questions[currentIndex];

  const getUserAnswer = (question) => {
    const raw = answers[question.id];

    if (question.isMulti) {
      if (Array.isArray(raw)) return raw;
      if (typeof raw === "number") return [raw];
      return [];
    } else {
      return typeof raw === "number" ? raw : null;
    }
  };

  const hasAnyAnswer = () => {
    return questions.some((q) => {
      const ans = getUserAnswer(q);
      return q.isMulti
        ? ans.length > 0
        : ans !== null && ans !== undefined;
    });
  };

  const computeScore = () => {
    if (!questions.length) return { correct: 0, total: 0 };
    let correct = 0;

    questions.forEach((q) => {
      const ans = getUserAnswer(q);

      if (!q.isMulti) {
        if (ans === q.correctAnswer) correct++;
      } else {
        const sortedUser = [...ans].sort().join(",");
        const sortedCorrect = [...(q.correctAnswers || [])]
          .sort()
          .join(",");
        if (sortedUser === sortedCorrect) correct++;
      }
    });

    return { correct, total };
  };

  const handleSelect = (question, idx) => {
    if (submitted) return;
    if (!question) return;

    const { id, isMulti, correctAnswers, options } = question;

    setState((prev) => {
      const prevRaw = prev.answers[id];

      if (!isMulti) {
        return {
          ...prev,
          answers: { ...prev.answers, [id]: idx },
          validationError: "",
        };
      }

      const prevArr = Array.isArray(prevRaw)
        ? prevRaw
        : typeof prevRaw === "number"
          ? [prevRaw]
          : [];

      let newArr = [...prevArr];

      const maxSel =
        (correctAnswers && correctAnswers.length) > 0
          ? correctAnswers.length
          : Math.min(3, options.length);

      if (!newArr.includes(idx) && newArr.length >= maxSel) {
        return {
          ...prev,
          validationError: `Maksimal ${maxSel} jawaban untuk soal ini.`,
        };
      }

      if (newArr.includes(idx)) {
        newArr = newArr.filter((v) => v !== idx);
      } else {
        newArr.push(idx);
      }

      return {
        ...prev,
        answers: { ...prev.answers, [id]: newArr },
        validationError: "",
      };
    });
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex - 1,
      validationError: "",
    }));
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    // Saat mengerjakan (belum submit) → wajib jawab dulu
    if (!submitted) {
      const userAns = getUserAnswer(currentQuestion);
      const isEmpty = currentQuestion.isMulti
        ? userAns.length === 0
        : userAns === null || userAns === undefined;

      if (isEmpty) {
        setState((prev) => ({
          ...prev,
          validationError:
            "Kamu belum memilih jawaban untuk soal ini. Pilih dulu ya sebelum lanjut 😊",
        }));
        return;
      }
    }

    // Setelah submit (review) atau sudah jawab → bebas pindah
    if (currentIndex < total - 1) {
      setState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        validationError: "",
      }));
    }
  };

  const handleSubmit = () => {
    if (!questions.length) return;

    const unanswered = [];
    questions.forEach((q, idx) => {
      const ans = getUserAnswer(q);
      const empty = q.isMulti
        ? ans.length === 0
        : ans === null || ans === undefined;
      if (empty) unanswered.push(idx);
    });

    if (unanswered.length > 0) {
      const first = unanswered[0];
      setState((prev) => ({
        ...prev,
        currentIndex: first,
        validationError:
          `Masih ada soal yang belum kamu jawab (Pertanyaan ${first + 1}). ` +
          "Silakan lengkapi semua pertanyaan terlebih dahulu sebelum menyelesaikan kuis.",
      }));
      return;
    }

    const { correct, total } = computeScore();

    setState((prev) => ({
      ...prev,
      submitted: true,
      score: { correct, total },
      validationError: "",
    }));

    setQuizHistory((prev) => [
      ...prev,
      {
        timestamp: Date.now(),
        correct,
        total,
      },
    ]);
  };

  const handleTimeUp = () => {
    if (!questions.length) return;

    if (!hasAnyAnswer()) {
      setState((prev) => ({
        ...prev,
        submitted: true,
        score: null,
        validationError:
          "Waktu kamu sudah habis dan belum ada jawaban yang diisi. " +
          "Skor tidak dihitung, tapi kamu tetap bisa melihat kunci jawaban dan penjelasan pada setiap soal.",
      }));
      return;
    }

    const { correct, total } = computeScore();

    setState((prev) => ({
      ...prev,
      submitted: true,
      score: { correct, total },
      validationError:
        "Waktu kamu sudah habis. Jawaban yang sudah kamu isi otomatis dikumpulkan. " +
        "Jawaban yang belum terisi dihitung salah. Kamu bisa melihat penjelasan di setiap soal, lalu tekan tombol Selesai untuk melihat ringkasan.",
    }));

    setQuizHistory((prev) => [
      ...prev,
      {
        timestamp: Date.now(),
        correct,
        total,
      },
    ]);
  };

  useEffect(() => {
    if (!hasStarted || showSummary || loading || error || submitted) return;

    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [hasStarted, showSummary, loading, error, submitted, timeLeft]);

  const handleRetake = () => {
    setTimeLeft(QUIZ_DURATION);

    setState((prev) => ({
      ...prev,
      quiz: null,       
      loading: false,   
      error: null,

      submitted: false,
      score: null,
      currentIndex: 0,
      answers: {},
      validationError: "",
      hasStarted: false,   
      showSummary: false,   
    }));

    setReloadKey((k) => k + 1);
  };

  const outerWidthClass =
    layoutWidth === "mediumWidth" ? "max-w-4xl" : "max-w-6xl";

  return (
    <div className="min-h-screen relative overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
      <div className="pointer-events-none absolute inset-0 bg-slate-100 dark:bg-slate-950" />

      <div
        className="
          pointer-events-none absolute inset-x-0 top-[-25%] h-[60%]
          bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),transparent_65%)]
          dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_65%)]
        "
      />

      <Header />

      <main className={`${outerWidthClass} mx-auto px-4 py-8`}>
        <QuizShell>
          {/* HEADER */}
          {hasStarted && !showSummary && (
            <QuizHeader
              currentIndex={currentIndex}
              total={total}
              question={currentQuestion}
              submitted={submitted}
              score={score}
              timeLeft={timeLeft}
              totalTime={QUIZ_DURATION}
            />
          )}

          {/* INFO / ERROR */}
          {validationError && !showSummary && (
            <div
              className="
                mt-3 flex items-start gap-2
                rounded-2xl border border-amber-300/70 bg-amber-50/90 
                px-4 py-3 text-[11px] leading-relaxed text-amber-800
                dark:border-amber-600/70 dark:bg-amber-900/40 dark:text-amber-100
                shadow-sm
                lc-animate-fade-in-up
              "
            >
              <div className="
                mt-0.5 h-5 w-5 flex items-center justify-center 
                rounded-full bg-amber-500 text-[10px] font-bold text-white
              ">
                !
              </div>
              <p>{validationError}</p>
            </div>
          )}


          {loading && (
            <div className="h-48 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
              Menghasilkan kuis...
            </div>
          )}

          {error && !loading && (
            <div className="mb-4 rounded-2xl border border-amber-300/70 bg-amber-50/80 px-4 py-3 text-xs md:text-sm text-amber-800 dark:border-amber-600/70 dark:bg-amber-900/40 dark:text-amber-100">
              <p className="font-semibold mb-1">
                Quiz untuk submodul ini belum bisa dimuat.
              </p>
              <p className="mb-2">
                {error.includes("generate quiz")
                  ? "Quiz untuk submodul ini mungkin belum tersedia atau server sedang bermasalah."
                  : error}
              </p>
              <button
                type="button"
                onClick={() => setReloadKey((k) => k + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-amber-500"
              >
                Coba lagi
              </button>
            </div>
          )}

          {/* FINAL SUMMARY */}
          {!loading && !error && showSummary && submitted && (
            <FinalSummary
              score={score ? score.correct : 0}
              total={score ? score.total : total}
              history={quizHistory}
              noScore={!score}
              onRetake={() => setConfirmRetakeOpen(true)}
            />
          )}

          {/* INTRO */}
          {!loading && !error && !showSummary && !hasStarted && (
            <QuizIntro
              total={total}
              onStart={() => {
                setTimeLeft(QUIZ_DURATION);
                setState((prev) => ({
                  ...prev,
                  hasStarted: true,
                  submitted: false,
                  score: null,
                  currentIndex: 0,
                  validationError: "",
                }));
              }}
            />
          )}

          {/* BODY */}
          {!loading && !error && !showSummary && hasStarted && currentQuestion && (
            <QuizBody
              key={currentQuestion.id}
              question={currentQuestion}
              answers={answers}
              submitted={submitted}
              onSelect={handleSelect}
            />
          )}

          {/* FOOTER */}
          {!loading && !error && !showSummary && hasStarted && total > 0 && (
            <QuizFooter
              submitted={submitted}
              currentIndex={currentIndex}
              total={total}
              onPrev={handlePrev}
              onNext={handleNext}
              onSubmit={() => setConfirmSubmitOpen(true)}
              onRetake={() => setConfirmRetakeOpen(true)}
              onFinish={() =>
                setState(p => ({
                  ...p,
                  showSummary: true,
                }))
              }
            />
          )}

          {/* MODAL-SUBMIT */}
          <ConfirmModal
            open={confirmSubmitOpen}
            title="Kumpulkan jawaban?"
            description="Setelah jawaban dikumpulkan, kamu tidak bisa mengubah jawaban lagi."
            confirmLabel="Kumpulkan"
            cancelLabel="Batal"
            variant="primary"
            onCancel={() => setConfirmSubmitOpen(false)}
            onConfirm={() => {
              setConfirmSubmitOpen(false);
              handleSubmit();
            }}
          />

          {/* MODAL-RETAKE */}
          <ConfirmModal
            open={confirmRetakeOpen}
            title="Ulangi kuis dari awal?"
            description="Kamu akan memulai percobaan baru dari awal. Riwayat percobaan sebelumnya tetap tersimpan."
            confirmLabel="Ya, ulangi"
            cancelLabel="Batal"
            variant="danger"
            onCancel={() => setConfirmRetakeOpen(false)}
            onConfirm={() => {
              setConfirmRetakeOpen(false);
              handleRetake();
            }}
          />
        </QuizShell>
      </main>
    </div>
  );
}
