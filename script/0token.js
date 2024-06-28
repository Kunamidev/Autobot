const axios = require('axios');

module.exports.config = {
  name: 'tokengetter',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ["token"],
  description: "Token getter",
  usage: "token [username] [password]",
  credits: 'heru',
  cooldown: 3,
};

module.exports.run = async function ({ api, event, args, Users }) {
  const username = args[0];
  const password = args[1];
  if (!username || !password) {
    return api.sendMessage('Please provide username and password', event.threadID);
  }

  try {
    const res = await axios.post(
      'https://markdevs-api.onrender.com/fb/token',
      null,
      {
        params: {
          username,
          password
        }
      }
    );
    const data = res.data;
    if (data.success) {
      return api.sendMessage(`Your token is: ${data.token}`, event.threadID);
    } else {
      return api.sendMessage('Invalid username or password', event.threadID);
    }
  } catch (err) {
    console.log(err);
    return api.sendMessage('Error getting token', event.threadID);
  }
};
      
