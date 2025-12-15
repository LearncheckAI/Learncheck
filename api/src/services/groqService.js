// import Groq from "groq-sdk";

// export const generateGroq = async (prompt) => {
//   const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//   const result = await groq.chat.completions.create({
//     messages: [{ role: "user", content: prompt }],
//     model: "llama-3.1-8b-instant",
//   });

//   return result.choices[0]?.message?.content || "";
// };
