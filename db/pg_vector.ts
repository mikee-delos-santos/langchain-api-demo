import { Embeddings } from "langchain/embeddings/base";
import { PGVectorStore } from "langchain/vectorstores/pgvector";
import { PoolConfig } from "pg";
import  DBBase  from "./db_base";

const config = {
  postgresConnectionOptions: {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
  } as PoolConfig,
  tableName: "testlangchain",
  columns: {
    idColumnName: "id",
    vectorColumnName: "vector",
    contentColumnName: "content",
    metadataColumnName: "metadata",
  },
};

export class PgVector implements DBBase {
  async getStore(embedding: Embeddings) {
    return await PGVectorStore.initialize(embedding, config)  
  }
}
