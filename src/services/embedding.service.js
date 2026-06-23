import { client } from "../config/openai.js";

export async function embed(text) {
  const result = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return result.data[0].embedding;
}
