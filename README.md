# RAG Test Project

Simple Retrieval-Augmented Generation (RAG) API built with Node.js, Express, SQLite, sqlite-vec, and OpenAI.

This project lets you:

- Ingest a PDF into a local vector database
- Retrieve relevant chunks for a question
- Generate an answer constrained to retrieved context

## Stack

- Node.js (ESM)
- Express
- OpenAI API
- SQLite via better-sqlite3
- Vector search via sqlite-vec

## How It Works

1. Upload a PDF file path to the API
2. Server extracts text from the PDF
3. Text is split into overlapping chunks
4. Each chunk is embedded with OpenAI text-embedding-3-small
5. Chunks and embeddings are stored in SQLite
6. A question is embedded and matched against stored vectors
7. Top chunks are passed as context to the chat model

## Project Structure

- src/server.js: Express app entrypoint
- src/routes/upload.route.js: PDF ingestion endpoint
- src/routes/chat.route.js: Question answering endpoints
- src/services/ingest.service.js: Chunk + embed + persist pipeline
- src/services/retrieval.service.js: Vector similarity retrieval
- src/services/rag.service.js: Final answer generation with retrieved context
- src/services/embedding.service.js: OpenAI embedding client wrapper
- src/config/db.js: SQLite and sqlite-vec setup
- src/config/openai.js: OpenAI client config
- src/utils/chunker.js: Chunking logic
- test-db.js: sqlite-vec local smoke test

## Prerequisites

- Node.js 20+
- npm
- OpenAI API key

## Setup

1. Install dependencies:

   npm install

2. Create environment file:

   .env

3. Add this variable to .env:

   OPENAI_API_KEY=your_api_key_here

4. Start the server:

   npm run start

Server default port is 3000 unless PORT is set.

## API

Base URL: http://localhost:3000/api

### 1) Ingest PDF

POST /upload

Request body:

{
"path": "/absolute/path/to/file.pdf"
}

Example:

curl -X POST http://localhost:3000/api/upload \
 -H "Content-Type: application/json" \
 -d '{"path":"/home/user/docs/guide.pdf"}'

Response:

{
"documentId": "uuid"
}

### 2) Ask Question (POST)

POST /chat

Request body:

{
"question": "What is this document about?"
}

Example:

curl -X POST http://localhost:3000/api/chat \
 -H "Content-Type: application/json" \
 -d '{"question":"What are the main points?"}'

Response shape:

{
"answer": "...",
"sources": [
{
"id": "chunk-id",
"content": "retrieved text chunk",
"distance": 0.123
}
]
}

## Local Database

The app creates a local SQLite file at:

- rag.db

Tables created automatically:

- documents
- chunks
- chunk_embeddings (sqlite-vec virtual table)

## Current Script

- npm run start: Runs server with Node watch mode

Note: Node watch mode may show an experimental warning depending on your Node version.

## Troubleshooting

### better-sqlite3 Node version mismatch

If you see errors like "compiled against a different Node.js version":

1. Rebuild native module:

   npm rebuild better-sqlite3

2. If needed, clean install:

   rm -rf node_modules package-lock.json
   npm install

3. Start again:

   npm run start

### OpenAI auth error

- Verify OPENAI_API_KEY is set in .env
- Restart the server after changing .env

## Notes

- This is a lightweight test project, intended for local experimentation.
- Upload endpoint currently expects a local filesystem path, not multipart file upload.
