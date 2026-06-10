const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askLLM(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL,
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: Number(process.env.TEMPERATURE),
        maxOutputTokens: Number(process.env.MAX_OUTPUT_TOKENS),
        topP: Number(process.env.TOP_P),
        topK: Number(process.env.TOP_K),
      },
    });

    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

module.exports = {
  askLLM,
};