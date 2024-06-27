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
    name: 'ai',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['heru'],
    description: 'AI Command',
    usage: 'ai [query]',
    credits: 'developer',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const query = args.join(' ');

    if (!query) {
        api.sendMessage('(❓) 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗 𝚏𝚒𝚛𝚜𝚝.', event.threadID, event.messageID);
        return;
    }

    // Send initial message and set "⌛" reaction
    api.sendMessage('(⌛) 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝....', event.threadID, (err, messageInfo) => {
        if (err) {
            console.error('Error sending initial message:', err);
            return;
        }

        const messageID = messageInfo.messageID;
        api.setMessageReaction('⌛', messageID, (err) => {
            if (err) {
                console.error('Error setting reaction:', err);
            }
        });

        try {
            axios.get('https://markdevs-api.onrender.com/gpt4', {
                params: { prompt: query, uid: event.senderID }
            }).then(aiResponse => {
                const aiData = aiResponse.data.gpt4;

                api.getUserInfo(event.senderID, (err, result) => {
                    if (err) {
                        console.error('Error fetching user info:', err);
                        api.sendMessage('An error occurred while fetching the user info.', event.threadID, event.messageID);
                        return;
                    }

                    const userName = result[event.senderID].name;

                    // Format the AI response text using the formatFont function
                    const formattedResponse = formatFont(aiData);

                    // Send the combined response
                    const finalResponse = `**${formattedResponse}**\n\n𝚀𝚞𝚎𝚜𝚝𝚒𝚘𝚗 𝚊𝚜𝚔 𝚋𝚢: ${userName}`;
                    api.sendMessage(finalResponse, event.threadID, (err, responseMessageInfo) => {
                        if (err) {
                            console.error('Error sending final response:', err);
                            return;
                        }

                        // Set "✅" reaction to the initial message
                        api.setMessageReaction('✅', messageID, (err) => {
                            if (err) {
                                console.error('Error setting reaction:', err);
                            }
                        });
                    });
                });
            }).catch(error => {
                console.error('Error:', error);
                api.sendMessage('An error occurred while fetching the response.', event.threadID, event.messageID);
            });
        } catch (error) {
            console.error('Error:', error);
            api.sendMessage('An error occurred while fetching the response.', event.threadID, event.messageID);
        }
    });
};
        
