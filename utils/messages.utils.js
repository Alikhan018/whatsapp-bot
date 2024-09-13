const Gemini = require("../services/gemini.services");

class Message {
  constructor() {}
  async proccessMessage(message) {
    if (message.body.toLowerCase().includes("hello")) {
      message.reply("Hello! How can I assist you today?");
    } else if (message.body.toLowerCase().includes("status")) {
      message.reply("The system is up and running!");
    } else if (message.body.toLowerCase().includes("help")) {
      message.reply("Here are the available commands: $status, $help, $bot-on");
    } else {
      message.reply(await Gemini.onPromptSubmit(message.body));
    }
  }
}

module.exports = new Message();
