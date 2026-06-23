import Database from "better-sqlite3";
import * as sqliteVec from "sqlite-vec";

const db = new Database("rag.db");

sqliteVec.load(db);

db.exec(`
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  name TEXT
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS chunks (
  id TEXT PRIMARY KEY,
  document_id TEXT,
  content TEXT
);
`);

db.exec(`
CREATE VIRTUAL TABLE IF NOT EXISTS chunk_embeddings
USING vec0(
  chunk_id TEXT PRIMARY KEY,
  embedding FLOAT[1536]
);
`);

export default db;
