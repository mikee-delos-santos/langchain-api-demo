import { Embeddings } from "langchain/embeddings/base"
import { PgVector } from "./pg_vector"

export const getStore = async (embedding: Embeddings) => {
  const pg = new PgVector()
  return await pg.getStore(embedding)
}