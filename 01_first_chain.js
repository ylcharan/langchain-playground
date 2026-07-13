import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-flash-latest",
});
const template = "Be very funny while answering the questions: {question}";
const prompt = new PromptTemplate({
  template,
  inputVariables: ["question"],
});
const chain = prompt.pipe(model);

const result = await chain.invoke({
  question: "who is the captain of eng test cricket?",
});
console.log(result.content);
