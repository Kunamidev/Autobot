const { get } = require('axios');

module.exports.config = {
  name: 'gpt',
  credits: "cliff",
  version: '1.0.0',
  role: 0,
  aliases: ["Gpt"],
  cooldown: 0,
  hasPrefix: false,
  usage: "",
};

module.exports.run = async function ({ api, event, args }) {
  const question = args.join(' ');
  const { messageID } = event;

  function sendMessage(msg) {
    api.sendMessage(msg, event.threadID, messageID);
  }

  const url = "https://hercai.onrender.com/v3/hercai";

  if (!question) return sendMessage("Please provide a question.");

  // Send initial message and set "⌛" reaction
  api.sendMessage('Searching, please wait...', event.threadID, async (err, messageInfo) => {
    if (err) {
      console.error('Error sending initial message:', err);
      return;
    }

    const searchMessageID = messageInfo.messageID;
    api.setMessageReaction('⌛', searchMessageID, (err) => {
      if (err) {
        console.error('Error setting reaction:', err);
      }
    });

    try {
      const response = await get(`${url}?question=${encodeURIComponent(question)}`);
      sendMessage(response.data.reply);

      // Fetch data from axios and edit the message
      const marky = await get(``); // Add the correct URL here
      api.editMessage(`${response.data.reply}\n\n${marky.data}`, searchMessageID, (err) => {
        if (err) {
          console.error('Error editing message:', err);
        }
      });

      // Set "✅" reaction to the initial message
      api.setMessageReaction('✅', searchMessageID, (err) => {
        if (err) {
          console.error('Error setting reaction:', err);
        }
      });
    } catch (error) {
      sendMessage("An error occurred: " + error.message);
    }
  });
};
