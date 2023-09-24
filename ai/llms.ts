import { OpenAI } from "langchain/llms/openai";
import { HuggingFaceInference } from "langchain/llms/hf";

export const getOpenAILLM = () => {
  return new OpenAI({
    openAIApiKey: Bun.env.OPENAI_API_KEY
  });
}

export const getHuggingFaceInference = (model?: string) => {
  return new HuggingFaceInference({
    apiKey: Bun.env.HUGGING_FACE_API_KEY,
    model: model,
  })
}
