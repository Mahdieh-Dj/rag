import db from "../config/db.js";
import { embed } from "./embedding.service.js";

export async function retrieve(query, limit = 5) {
  const queryVector = await embed(query);

  const stmt = db.prepare(`
    SELECT
      c.id,
      c.content,
      distance
    FROM chunk_embeddings e
    JOIN chunks c
      ON c.id = e.chunk_id
    WHERE embedding MATCH ?
    ORDER BY distance
    LIMIT ?
  `);

  return stmt.all(JSON.stringify(queryVector), limit);
}
