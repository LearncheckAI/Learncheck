export default function sanitizeRawLLM(raw) {
    let text = raw.replace(/\r/g, "").trim();

    const replacements = [
        { pattern: /^Tipe\s*:/gim, replace: "Jenis:" },
        { pattern: /^Type\s*:/gim, replace: "Jenis:" },
        { pattern: /^Jenis\s*:/gim, replace: "Jenis:" },

        { pattern: /^Pertanyaan\s*:/gim, replace: "Pertanyaan:" },
        { pattern: /^Question\s*:/gim, replace: "Pertanyaan:" },

        { pattern: /^Jawaban\s*:/gim, replace: "Jawaban:" },
        { pattern: /^Answer\s*:/gim, replace: "Jawaban:" },
        { pattern: /^Pilihan Jawaban\s*:/gim, replace: "Jawaban:" },
        { pattern: /^Kunci Jawaban\s*:/gim, replace: "Jawaban:" },
        { pattern: /^Kota\s*:/gim, replace: "Jawaban:" },
        { pattern: /^Kata Jawaban\s*:/gim, replace: "Jawaban:" },

        { pattern: /^Penjelasan\s*:/gim, replace: "Penjelasan:" },
        { pattern: /^Explanation\s*:/gim, replace: "Penjelasan:" },
        { pattern: /^Eksplanasi\s*:/gim, replace: "Penjelasan:" },
        { pattern: /^Explanasi\s*:/gim, replace: "Penjelasan:" },
        { pattern: /^Explaanasi\s*:/gim, replace: "Penjelasan:" },
        { pattern: /^Exaplanation\s*:/gim, replace: "Penjelasan:" },
    ];

    for (const r of replacements) {
        text = text.replace(r.pattern, r.replace);
    }

    text = text.replace(/•\s*/g, "-- ");
    text = text.replace(/\*\s*/g, "-- ");

    text = text.replace(/^\d+\.\s*/gm, "");

    return text;
}