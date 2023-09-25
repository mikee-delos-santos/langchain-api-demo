import { PineconeClient} from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeLibArgs, PineconeStore } from "langchain/vectorstores/pinecone";
import  DBBase  from "./db_base";
import { Embeddings } from "langchain/embeddings/base";
import { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";

const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY as string,
  environment: 'gcp-starter'
});

export class PineconeDB implements DBBase {
  async getStore(embedding: Embeddings) {
    const pineconeIndex = client.Index('bunch-demo');
    // PineconeStore.fromDocuments([],embedding, {pineconeIndex: pineconeIndex})
    return PineconeStore.fromExistingIndex(embedding, {pineconeIndex: pineconeIndex})
  }
}
