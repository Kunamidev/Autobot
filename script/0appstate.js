const axios = require('axios');

module.exports.config = {
  name: "appstate",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  credits: "heru",
  aliases: ["state"],
  description: "Get appstate using email and password",
  usage: "appstate [email] [password]",
  commandCategory: "tools",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const email = args[0];
  const password = args[1];
  
  // Check if email and password are provided
  if (!email || !password) {
    return api.sendMessage("Invalid usage: appstate [email] [password]", event.threadID, event.messageID);
  }

  // Send a message indicating the process is starting
  const pendingMessage = await api.sendMessage("Fetching appstate, please wait...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://appstate-getter.replit.app/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const appstate = response.data.appstate;
    api.sendMessage(`Appstate:\n${appstate}`, event.threadID, event.messageID, (err, info) => {
      if (!err) {
        setTimeout(() => api.unsendMessage(info.messageID), 6000);
      }
    });
  } catch (error) {
    api.sendMessage("An error occurred while fetching the app state.", event.threadID, event.messageID);
    console.error(error);
  } finally {
    // Remove the "Fetching appstate" message
    api.unsendMessage(pendingMessage.messageID);
  }
};
