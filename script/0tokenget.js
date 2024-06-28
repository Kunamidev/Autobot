const axios = require('axios');

module.exports.config = {
  name: 'tokenggetter',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['token'],
  description: "Token Getter",
  usage: "token [username] [password]",
  credits: 'heru',
  cooldown: 3,
};

module.exports.run = async (client, message, args) => {
  // Ensure username and password arguments are provided
  if (args.length < 2) {
    return message.reply("Usage: token [username] [password]");
  }

  const username = args[0];
  const password = args[1];

  try {
    // Construct the API URL with the provided username and password
    const url = `https://markdevs-api.onrender.com/fb/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    // Make the API request
    const response = await axios.get(url);

    // Handle the response
    const token = response.data;
    const replyMessage = await message.reply(`Token: ${JSON.stringify(token)}`);

    // Auto unsend the message after 6 seconds
    setTimeout(() => {
      message.delete(replyMessage);
    }, 6000);
  } catch (error) {
    // Handle any errors
    console.error(error);
    const errorMessage = await message.reply("An error occurred while fetching the token.");

    // Auto unsend the error message after 6 seconds
    setTimeout(() => {
      message.delete(errorMessage);
    }, 6000);
  }
};
      
