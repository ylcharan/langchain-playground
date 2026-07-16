import { config } from "dotenv";
config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const prompt1 = ChatPromptTemplate.fromTemplate(
  "Write a short paragraph about {topic}",
);

const prompt2 = ChatPromptTemplate.fromTemplate(
  "Summarize the following text in one sentence:\n\n{text}",
);

const chain = prompt1
  .pipe(llm)
  .pipe(new StringOutputParser())
  .pipe((text) => {
    console.log("\nParagraph:\n", text);
    return { text };
  })
  .pipe(prompt2)
  .pipe(llm)
  .pipe(new StringOutputParser());

const res = await chain.invoke({
  topic: "Indian movies",
});

console.log(res);
