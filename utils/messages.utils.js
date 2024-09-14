const Gemini = require("../services/gemini.services");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { MessageMedia } = require("whatsapp-web.js");
const markdown = require("markdown-it");

class Message {
  constructor() {}

  async proccessMessage(message) {
    const messageText = message.body.toLowerCase();

    if (messageText.includes("$status")) {
      message.reply("The system is up and running!");
    } else if (messageText.includes("$help")) {
      message.reply(
        "Here are the available commands: $status-->\tshows status of bot,\n$bot-off-->\tturns of the bot,\n!gemini-->\tuse gemini ai,\n!pdf-->\t make pdf by giving a topic\n"
      );
    } else {
      if (message.body.includes("!gemini")) {
        const response = await Gemini.onPromptSubmit(message.body);
        message.reply(response);
      }

      if (message.body.includes("!pdf")) {
        this.sendPdf(message);
      }
    }
  }
  async sendPdf(message) {
    const finalMessage = message.body.replace(/!pdf/, "");
    const promptReply = await Gemini.onPromptSubmit(finalMessage);
    const pdfPath = path.join(__dirname, "output.pdf");

    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const htmlContent = this.formatResponse(promptReply);
      await page.setContent(htmlContent);
      await page.pdf({
        path: pdfPath,
        format: "A4",
        printBackground: true,
      });
      await browser.close();
      const media = MessageMedia.fromFilePath(pdfPath);
      await message.reply(media);
    } catch (err) {
      console.log("Error generating PDF:", err);
    }
  }
  formatResponse(text) {
    const md = markdown();
    const result = md.render(text);
    return result;
  }
}

module.exports = new Message();
