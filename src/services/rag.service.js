import { retrieve } from "./retrieval.service.js";

import { embed } from "./embedding.service.js";

export async function ask(question) {
  const docs = await retrieve(question);

  const context = docs.map((d) => d.content).join("\n\n");

  const response = await embed.chat.completions.create({
    model: "gpt-5",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
Answer only from context.

If not found say:
I don't know.
`,
      },
      {
        role: "user",
        content: `
Context:

${context}

Question:

${question}
`,
      },
    ],
  });

  return {
    answer: response.choices[0].message.content,
    sources: docs,
  };
}
