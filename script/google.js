const axios = require('axios');

module.exports.config = {
  name: "Google",
  version: "1.2",
  role: 0,
  credits: "Hazeyy",
  aliases: ["Google", "google"], 
  cooldowns: 3,
  hasPrefix: false,
};

module.exports.run = async function ({ api, event, args }) {

const query = args.join(' ');
    if (!query) {
        api.sendMessage("🔍 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚝𝚘𝚙𝚒𝚌 𝚝𝚘 𝚜𝚎𝚊𝚛𝚌𝚑 𝚘𝚗 𝙶𝚘𝚘𝚐𝚕𝚎 𝙲𝚑𝚛𝚘𝚖𝚎", event.threadID, event.messageID);
        return;
    }

    const cx = "7514b16a62add47ae"; 
    const apiKey = "AIzaSyAqBaaYWktE14aDwDE8prVIbCH88zni12E";
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}`;

    try {
        const response = await axios.get(url);
        const searchResults = response.data.items.slice(0, 5);
      
        api.sendMessage('🕥 | 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚘𝚗 𝙶𝚘𝚘𝚐𝚕𝚎 𝙲𝚑𝚛𝚘𝚖𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝... ', event.threadID, event.messageID);

        let message = `✅ 𝙷𝚎𝚛𝚎 𝚊𝚛𝚎 𝚝𝚑𝚎 𝚝𝚘𝚙 5 𝚛𝚎𝚜𝚞𝚕𝚝𝚜 𝚏𝚘𝚛 » '${query}' «\n\n`;

        searchResults.forEach((result, index) => {
            message += `Result ${index + 1}:\n`;
            message += `Title: ${result.title}\n`;
            message += `Link: ${result.link}\n`;
            message += `Snippet: ${result.snippet}\n\n`;
        });

        api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("🤖 𝙴𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.", event.threadID, event.messageID);
    }
};

