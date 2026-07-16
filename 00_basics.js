import { config } from "dotenv";
config();

import { z } from "zod";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const ansSchema = z.object({
  result: z.string(),
  confidence: z.number(),
});

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-flash-latest",
  temperature: 0.7,
});

const model = llm.withStructuredOutput(ansSchema);

const demo = async () => {
  try {
    const promptTemplate = `Be very careful and do not hallucinate. Answer the following question: {question}`;
    const prompt = promptTemplate.replace(
      "{question}",
      "What is the capital of Andhra Pradesh?",
    );
    const response = await model.invoke(prompt);
    console.dir(response, { depth: null });
  } catch (err) {
    console.error("Error calling Gemini:", err);
  }
};

demo();
