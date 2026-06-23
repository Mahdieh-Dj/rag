import express from "express";
import fs from "fs";
import pdf from "pdf-parse";

import { ingestText } from "../services/ingest.service.js";

const router = express.Router();

router.post("/upload", async (req, res) => {
  const file = req.body.path;

  const buffer = fs.readFileSync(file);

  const parsed = await pdf(buffer);

  const docId = await ingestText(file, parsed.text);

  res.json({
    documentId: docId,
  });
});

export default router;
