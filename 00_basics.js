import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-flash-latest",
  temperature: 0.7,
  maxOutputTokens: 2048,
});
const demo = async () => {
  try {
    const promptTemplate = `Be very careful and do not hallucinate. Answer the following question: {question}`;
    const prompt = promptTemplate.replace(
      "{question}",
      "What is the capital of Andhra Pradesh?",
    );
    const response = await model.invoke(prompt);

    console.log("AI RESPONSE:", response.content);
  } catch (err) {
    console.error("Error calling Gemini:", err);
  }
};

demo();
