export const buildPrompt = (content) => `
Generate 3 quiz questions in Indonesian based on the text below.
2 multiple_choice (4 options) and 1 multiple_answers (5 options, has more than one correct answers).
Follow this exact format for every question (must include explanation field):

Type: <multiple_choice | multiple_answer>
Question: <question>
-- <Option A>
-- <Option B>
Answer: <A|B>
Explanation: <long explanation with 2 sentences>

No comments, no notes, no numbering, no asterisk, no HTML syntax.
Text:
${content}
`;