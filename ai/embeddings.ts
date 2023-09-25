import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";


export const getHFEmbeddingModel = async (model?: string) => {
  let config = {
    apiKey: process.env.HUGGING_FACE_API_KEY,
    model: model,
  };

  return new HuggingFaceInferenceEmbeddings(config);
}

export const getOpenAIEmbeddingModel = async () => {
  return new OpenAIEmbeddings({openAIApiKey: process.env.OPENAI_API_KEY})
}
