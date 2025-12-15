import axios from "axios";

export const getTutorialContent = async (tutorialId) => {
  const url = `https://learncheck-dicoding-mock-666748076441.europe-west1.run.app/api/tutorials/${tutorialId}`;

  const res = await axios.get(url);
  // struktur dari respon yang kamu kirim tadi: data.data.content
  return res.data.data.content;
};
