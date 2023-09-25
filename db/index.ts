import { Embeddings } from "langchain/embeddings/base"
import { PgVector } from "./pg_vector"
import { PineconeDB } from "./pinecone"

// export const getStore = async (embedding: Embeddings) => {
//   const pg = new PgVector()
//   return await pg.getStore(embedding)
// }

export const getStore = async (embedding: Embeddings) => {
  const pg = new PineconeDB()
  return await pg.getStore(embedding)
}