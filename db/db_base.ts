import { Embeddings } from "langchain/embeddings/base";
import { VectorStore } from "langchain/vectorstores/base";

export default interface DBBase {
  getStore: (embedding: Embeddings) => Promise<VectorStore>
}