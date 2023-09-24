import { Embeddings } from "langchain/embeddings/base";
import { PGVectorStore } from "langchain/vectorstores/pgvector";
import { PoolConfig } from "pg";
import  DBBase  from "./db_base";

const config = {
  postgresConnectionOptions: {
    type: "postgres",
    host: "127.0.0.1",
    port: 5433,
    user: "myuser",
    password: "ChangeMe",
    database: "api",
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
