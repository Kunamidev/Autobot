const axios = require('axios');

module.exports.config = {
  name: 'appstategetter',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['appstate'],
  description: "AppState Getter",
  usage: "appstate [email] [password]",
  credits: 'heru',
  cooldown: 3,
};

module.exports.run = async (client, message, args) => {
  // Ensure email and password arguments are provided
  if (args.length < 2) {
    return message.reply("Usage: appstate [email] [password]");
  }

  const email = args[0];
  const password = args[1];

  try {
    // Construct the API URL with the provided email and password
    const url = `https://markdevs-api.onrender.com/api/appstate?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    // Make the API request
    const response = await axios.get(url);

    // Handle the response
    const appState = response.data;
    const replyMessage = await message.reply(`AppState: ${JSON.stringify(appState)}`);

    // Auto unsend the message after 6 seconds
    setTimeout(() => {
      message.delete(replyMessage);
    }, 6000);
  } catch (error) {
    // Handle any errors
    console.error(error);
    const errorMessage = await message.reply("An error occurred while fetching the app state.");

    // Auto unsend the error message after 6 seconds
    setTimeout(() => {
      message.delete(errorMessage);
    }, 6000);
  }
};
  
