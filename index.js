import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

dotenv.config({ path: ".env" });

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const result = await model.generateContent(message);
    const response = result.response.text();
    res.json({ response });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
