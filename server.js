import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Get API key from .env (never push your key to GitHub)
const API_KEY = process.env.HF_API_KEY;
const SUPER_MODEL = "SuperChatbox";

// Chat endpoint
app.post("/chat", async (req, res) => {
  const { message, mode = "basic" } = req.body;

  try {
    // If first chat or empty message, send intro
    if (!message || message.toLowerCase().includes("start")) {
      const intro = `Hello! I'm SuperChatbox, your AI companion built by Aarham! I can do a lot of awesome things: generate images, talk with your voice, help with ideas, answer questions, and much more! Let's start chatting!`;
      return res.json({ reply: intro });
    }

    // For other messages, send a fun placeholder reply
    const reply = `You said: "${message}". Imagine I could also generate images, speak with voice, and do many other amazing things!`;
    res.json({ reply });

    // ⚡ Optional: call Hugging Face model here for real AI responses
    /*
    const fetch = await import('node-fetch').then(m => m.default);
    const model = mode === "premium" ? SUPER_MODEL : "gpt2";
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: message })
    });
    const data = await response.json();
    res.json({ reply: data[0]?.generated_text?.trim() || "No response from AI" });
    */
  } catch (err) {
    console.error(err);
    res.json({ reply: "Oops! Something went wrong." });
  }
});

// Start server
app.listen(3000, () => console.log("SuperChatbox running at http://localhost:3000"));