const { get } = require('axios');

module.exports.config = {
  name: 'gpt',
  credits: "rona",
  version: '1.0.0',
  role: 0,
  aliases: ["Gpt"],
  cooldown: 0,
  hasPrefix: false,
  usage: "",
};

module.exports.run = async function ({ api, event, args }) {
  const question = args.join(' ');
  function sendMessage(msg) {
    api.sendMessage(msg, event.threadID, event.messageID);
  }

  const url = "https://hercai.onrender.com/v3/hercai";

  if (!question) return sendMessage("Please provide a question.");

  // Send initial message and set "⌛" reaction
  api.sendMessage('Searching, please wait...', event.threadID, (err, messageInfo) => {
    if (err) {
      console.error('Error sending initial message:', err);
      return;
    }

    const messageID = messageInfo.messageID;
    api.setMessageReaction('⌛', messageID, (err) => {
      if (err) {
        console.error('Error setting reaction:', err);
      }
    });

    try {
      get(`${url}?question=${encodeURIComponent(question)}`)
        .then(response => {
          sendMessage(response.data.reply);

          // Set "✅" reaction to the initial message
          api.setMessageReaction('✅', messageID, (err) => {
            if (err) {
              console.error('Error setting reaction:', err);
            }
          });
        })
        .catch(error => {
          sendMessage("An error occurred: " + error.message);
        });
    } catch (error) {
      sendMessage("An error occurred: " + error.message);
    }
  });
};
                  
