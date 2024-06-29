const axios = require('axios');

module.exports.config = {
  name: "tokengetter",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  credits: "heru",
  aliases: ["get", "token"],
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

  // Send a message indicating the process is starting
  const pendingMessage = await api.sendMessage("Fetching token, please wait...", event.threadID, event.messageID);

  try {
    const response = await axios.get(`https://markdevs-api.onrender.com/fb/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    if (response.data && response.data.token) {
      const token = response.data.token;
      api.sendMessage(`Token:\n${token}`, event.threadID, event.messageID, (err, info) => {
        if (!err) {
          setTimeout(() => api.unsendMessage(info.messageID), 6000);
        }
      });
    } else {
      api.sendMessage("Failed to fetch token. Please check your credentials.", event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("An error occurred while fetching the token.", event.threadID, event.messageID);
    console.error(error);
  } finally {
    // Remove the "Fetching token" message
    api.unsendMessage(pendingMessage.messageID);
  }
};
  
