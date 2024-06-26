const axios = require('axios');

function formatFont(text) {
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports.config = {
    name: 'rona',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['heru'],
    description: 'AI Command',
    usage: 'rona [query]',
    credits: 'developer',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const query = args.join(' ');
    const { messageID } = event;

    if (!query) {
        api.sendMessage('Please provide a question example:\nai what is love?', event.threadID, event.messageID);
        return;
    }

    // Send initial message and set "⌛" reaction
    api.sendMessage('Searching for an answer, please wait...', event.threadID, async (err, messageInfo) => {
        if (err) {
            console.error('Error sending initial message:', err);
            return;
        }

        const searchMessageID = messageInfo.messageID;
        api.setMessageReaction('⌛', searchMessageID, (err) => {
            if (err) {
                console.error('Error setting reaction:', err);
            }
        });

        try {
            const aiResponse = await axios.get('https://markdevs-api.onrender.com/gpt4', {
                params: { prompt: query, uid: event.senderID }
            });
            const aiData = aiResponse.data.gpt4";

            // Fetch additional data from web scraping API
            const marky = await axios.get(`https://openapi-idk8.onrender.com/webscrape?url=${encodeURIComponent(aiData)}`);

            // Get user info
            api.getUserInfo(event.senderID, (err, result) => {
                if (err) {
                    console.error('Error fetching user info:', err);
                    api.sendMessage('An error occurred while fetching the user info.', event.threadID, event.messageID);
                    return;
                }

                const userName = result[event.senderID].name;

                // Send the combined response
                const finalResponse = `**${aiData}**\n\nQuestion asked by: ${userName}\n\n${marky.data}`;

                // Edit the initial message with the final response
                api.editMessage(finalResponse, searchMessageID, (err) => {
                    if (err) {
                        console.error('Error editing message:', err);
                    }
                });

                // Set "✅" reaction to the initial message
                api.setMessageReaction('✅', searchMessageID, (err) => {
                    if (err) {
                        console.error('Error setting reaction:', err);
                    }
                });
            });
        } catch (error) {
            console.error('Error:', error);
            api.sendMessage('An error occurred while fetching the response.', event.threadID, event.messageID);
        }
    });
};
                         
