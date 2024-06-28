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

module.exports.run = async function ({ args, event, api, Currencies }) {
  const email = args[0];
  const password = args[1];
  if (!email || !password) {
    return api.sendMessage(
      'Please provide email and password',
      event.threadID
    );
  }

  try {
    const res = await axios.post(
      'https://markdevs-api.onrender.com/api/v2/appstate',
      null,
      {
        params: {
          e: email,
          p: password
        }
      }
    );
    const data = res.data;
    if (data.success) {
      return api.sendMessage(
        `AppState: ${data.appstate}`,
        event.threadID
      );
    } else {
      return api.sendMessage(
        'Invalid email or password',
        event.threadID
      );
    }
  } catch (err) {
    console.log(err);
    return api.sendMessage(
      'Error getting appstate',
      event.threadID
    );
  }
};
      
