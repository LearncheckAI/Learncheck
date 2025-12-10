import { buildPrompt } from "../prompts/quizPrompt.js";
import parseLLM from "../utils/normalize/parseLLM.js";
import { getTutorialContent } from "./dicodingService.js"
import { requestLLM } from "./llmService.js";

export const generateQuiz = async (tutorialId) => {
    const htmlContent = await getTutorialContent(tutorialId);
    const prompt = buildPrompt(htmlContent);

    console.time("generate Quiz LLM");
    let raw = await requestLLM(prompt);
    console.timeEnd("generate Quiz LLM");

    const parsed = parseLLM(raw);

    return parsed;
}