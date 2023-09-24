import { Embeddings } from "langchain/embeddings/base"
import { PgVector } from "./pg_vector"

export const getStore = async (embedding: Embeddings) => {
  if(Bun.env.DB_CHOICE == 'pg') {
    const pg = new PgVector()
    return await pg.getStore(embedding)
  }

  if(Bun.env.DB_CHOICE == 'pinecone') {
    const pg = new PgVector()
    return await pg.getStore(embedding)
  }

  throw 'Cannot connect to db...'
}