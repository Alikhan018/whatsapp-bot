const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const Message = require("./utils/messages.utils");

class WhatsAppBot {
  constructor() {
    this.activeChats = new Set();
    this.client = new Client({
      puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
      authStrategy: new LocalAuth(),
    });

    this.initialize();
  }

  initialize() {
    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
      console.log("Client is ready!");
    });

    this.client.on("message_create", async (message) => {
      await this.handleMessage(message);
    });

    this.client.initialize();
  }

  async handleMessage(message) {
    const chatId = message.from;
    if (message.body === "$bot-on") {
      this.activeChats.add(chatId);
      message.reply("Bot is now active!\nEnter $help for help");
    } else if (message.body === "$bot-off") {
      this.activeChats.delete(chatId);
      message.reply("Bot is now inactive. Goodbye!");
    }
    if (this.activeChats.has(chatId)) {
      await Message.proccessMessage(message);
    }
  }
}

module.exports = new WhatsAppBot();
