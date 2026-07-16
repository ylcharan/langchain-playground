import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "dotenv";
config();

const llm = ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const template = ChatPromptTemplate.fromTemplate(
  "You ordered {dish_name} and you experience was {experience}. write a review: ",
);

const chain = template.pipe(llm);

const res = await chain.invoke("");
