import { generateGemini } from "./geminiService.js";

export const requestLLM = async (prompt) => {
    const timeout = (ms) =>
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("TIMEOUT")), ms)
        );

    const start = performance.now();

    try {
        const result = await Promise.race([
            generateGemini(prompt),
            timeout(10000)
        ]);

        console.log("Gemini time:", performance.now() - start, "ms");
        return result;

    } catch (err) {
        console.error("Gemini gagal:", err.message);
        throw new Error("Request ke Gemini gagal atau timeout");
    }
};
