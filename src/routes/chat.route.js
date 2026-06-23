import express from "express";
import { ask } from "../services/rag.service.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const result = await ask(req.body.question);

  res.json(result);
});

export default router;
