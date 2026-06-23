import { v4 as uuid } from "uuid";
import db from "../config/db.js";

import { embed } from "./embedding.service.js";
import { chunkText } from "../utils/chunker.js";

export async function ingestText(documentName, text) {
  const documentId = uuid();

  db.prepare(
    `
    INSERT INTO documents(id,name)
    VALUES (?,?)
  `,
  ).run(documentId, documentName);

  const chunks = chunkText(text);

  for (const chunk of chunks) {
    const chunkId = uuid();

    const vector = await embed(chunk);

    db.prepare(
      `
      INSERT INTO chunks(
        id,
        document_id,
        content
      )
      VALUES (?,?,?)
    `,
    ).run(chunkId, documentId, chunk);

    db.prepare(
      `
      INSERT INTO chunk_embeddings(
        chunk_id,
        embedding
      )
      VALUES (?,?)
    `,
    ).run(chunkId, JSON.stringify(vector));
  }

  return documentId;
}
