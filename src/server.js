import "dotenv/config";

import express from "express";

import chatRoute from "./routes/chat.route.js";

import uploadRoute from "./routes/upload.route.js";

const app = express();

app.use(express.json());

app.use("/api", uploadRoute);
app.use("/api", chatRoute);

app.listen(5020, () => console.log("Server Started"));
