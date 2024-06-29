const axios = require('axios');

module.exports.config = {
  name: "appstate",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  credits: "heru",
  aliases: ["state"],
  description: "get appstate",
  usage: "appstate [email] [password]",
  commandCategory: "tools",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const email = args[0];
  const password = args[1];

  
  if (!email || !password) {
    return api.sendMessage("Invalid usage: appstate [email/uid] [password]", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://appstate-getter.replit.app/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    const appstate = response.data.appstate;
    api.sendMessage(`Appstate:\n${appstate}`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching the app state.", event.threadID, event.messageID);
    console.error(error);
  }
};
