const { get } = require('axios');

module.exports.config = {
  name: 'gpt',
  credits: "heru | rona",
  version: '1.0.0',
  role: 0,
  aliases: ["Gpt"],
  cooldown: 0,
  hasPrefix: false,
  usage: "",
};

module.exports.run = async function ({ api, event, args, chat }) {
  const question = args.join(' ');
  function sendMessage(msg) {
    api.sendMessage(msg, event.threadID, event.messageID);
  }

  const url = "https://hercai.onrender.com/v3/hercai";

  if (!question) return sendMessage("Please provide a question.");

  const pending = await chat.reply('⌛ | Searching, please wait...', event.threadID, event.messageID);

  try {
    const response = await get(`${url}?question=${encodeURIComponent(question)}`);
    await chat.edit(response.data.reply, pending.messageID);
    await api.setMessageReaction('✅', event.messageID, (err) => {
      if (err) console.error(err);
    });
  } catch (error) {
    await chat.edit("An error occurred: " + error.message, pending.messageID);
    await api.setMessageReaction('❌', event.messageID, (err) => {
      if (err) console.error(err);
    });
  }
};
