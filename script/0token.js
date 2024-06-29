const axios = require('axios');

module.exports.config = {
  name: "tokengetter",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  credits: "heru",
  aliases: ["token"],
  description: "Get token using username and password",
  usage: "tokengetter [username] [password]",
  commandCategory: "tools",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const username = args[0];
  const password = args[1];
  
  // Check if username and password are provided
  if (!username || !password) {
    return api.sendMessage("Usage: tokengetter [username] [password]", event.threadID, event.messageID);
  }

  try {
    const response = await axios.get(`https://markdevs-api.onrender.com/fb/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    const token = response.data.token;
    api.sendMessage(`Token:\n${token}`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("An error occurred while fetching the token.", event.threadID, event.messageID);
    console.error(error);
  }
};
