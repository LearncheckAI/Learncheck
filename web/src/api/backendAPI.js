export const getTutorialContent = async (tutorialId) => {
  const url = `https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api/tutorials/${tutorialId}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Gagal fetch tutorial content");
  }

  const data = await res.json();
  // struktur: { status, message, data: { content: "<html>" } }
  return data.data.content;
};

// --- 2) Generate Quiz (dipakai QuizPage) ---
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const generateQuiz = async (tutorialId) => {
  // sesuai route backend: GET /api/quiz/:tutorialId
  const url = `${BASE_URL}/api/quiz/${tutorialId}`;
  console.log("Request quiz ke:", url);

  const res = await fetch(url, {
    method: "GET",
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch (e) {
    console.warn("Gagal parse JSON dari backend quiz:", e);
  }

  if (!res.ok) {
    const msg =
      payload?.message || `Gagal generate quiz (status ${res.status})`;
    throw new Error(msg);
  }

  // quizController.js mengembalikan:
  // { status: "success", tutorialId, questions: [...] }
  const questions = Array.isArray(payload?.questions)
    ? payload.questions
    : [];

  return questions;
};

/** 🔹 NEW: ambil user preferences dari mock API */
export const getUserPreferences = async (userId) => {
  const res = await fetch(
    `https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api/users/${userId}/preferences/`
  );

  if (!res.ok) {
    throw new Error("Gagal fetch user preferences");
  }

  const data = await res.json();
  // sesuai JSON yang kamu kirim: data.data.preference
  return data.data.preference;
};
