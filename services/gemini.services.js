const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

class ChatBot {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  async onPromptSubmit(prompt) {
    const res = await this.model.generateContent(prompt);
    return res.response.text();
  }
}

module.exports = new ChatBot();
