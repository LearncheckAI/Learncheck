import { letterToIndex } from "./letterToIndex.js";
import sanitizeRawLLM from "./sanitizeRawLLM.js";

export default function parseLLM(raw) {
    const cleaned = sanitizeRawLLM(raw);

    const blocks = cleaned
        .split(/Jenis:/g)
        .map(b => b.trim())
        .filter(b => b.length > 0);

    return blocks.map(block => {
        const jenis = block.match(/^(.*)/)?.[1]?.trim();
        const pertanyaan = block.match(/Pertanyaan:\s*(.*)/)?.[1]?.trim();

        const options = [...block.matchAll(/--\s(.*)/g)].map(m => m[1].trim());

        const jawabanRaw = block.match(/Jawaban:\s*(.*)/)?.[1]?.trim();

        let jawaban = [];

        if (jawabanRaw?.includes(",")) {
            jawaban = jawabanRaw.split(",").map(s => s.trim());
        } else {
            if (jawabanRaw.length === 1) {
                jawaban = [jawabanRaw];
            } else {
                jawaban = jawabanRaw.split("").map(char => char.trim()).filter(Boolean);
            }
        }

        jawaban = jawaban.map(letter => letterToIndex(letter));

        const penjelasan = block.match(/Penjelasan:\s*(.*)/)?.[1]?.trim();

        return {
            type: jenis,
            question: pertanyaan,
            options,
            correctAnswers: jawaban,
            explanation: penjelasan,
        };
    });
}
