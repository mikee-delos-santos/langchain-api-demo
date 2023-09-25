import { OpenAI } from "langchain/llms/openai";
import { HuggingFaceInference } from "langchain/llms/hf";

export const getOpenAILLM = () => {
  return new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY
  });
}

export const getHuggingFaceInference = (model?: string) => {
  return new HuggingFaceInference({
    apiKey: process.env.HUGGING_FACE_API_KEY,
    model: model,
  })
}
