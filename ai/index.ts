import * as VendorEmbeddings from './embeddings';
import * as VendorLLMs from './llms';
import { Embeddings } from "langchain/embeddings/base";

export const getVendor = async (vendorString: string, model?: string)=> {
  if(vendorString === 'openai')
    return VendorLLMs.getOpenAILLM()

  if(vendorString === 'huggingface')
    return VendorLLMs.getHuggingFaceInference(model)

  throw new Error("Cannot find vendor");
}

export const getVendorEmbeddings = async (vendorString: string):Promise<Embeddings> => {
  if(vendorString === 'openai')
    return VendorEmbeddings.getOpenAIEmbeddingModel()

  if(vendorString == 'huggingface')
    return VendorEmbeddings.getHFEmbeddingModel()

throw new Error("Cannot find vendor");
}