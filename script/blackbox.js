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
    name: 'blackbox',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['black', 'box'],
    description: 'ask blackbox',
    usage: 'blackbox',
    credits: 'developer',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const rona = args.join(' ');

    if (!rona) {
        api.sendMessage('(❓) 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗 𝚏𝚒𝚛𝚜𝚝.', event.threadID, (err, messageInfo) => {
            if (err) {
                console.error('Error sending initial message:', err);
                return;
            }
            setTimeout(() => {
                api.unsendMessage(messageInfo.messageID);
            }, 6000);
        });
        return;
    }

    api.sendMessage('(⌛) 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝....', event.threadID, (err, messageInfo) => {
        if (err) {
            console.error('Error sending initial message:', err);
            return;
        }

        const messageID = messageInfo.messageID;
        setTimeout(() => {
            api.unsendMessage(messageID);
        }, 6000);

        try {
            axios.get('https://joshweb.click/blackbox', {
                params: { prompt: rona }
            }).then(love => {
                const heru = love.data;

                const responseString = heru.data ? heru.data : JSON.stringify(heru, null, 2);

                // Format the response text using the formatFont function
                const formattedResponse = formatFont(responseString);

                // Send the final response
                const finalResponse = `**${formattedResponse}** 🌺`;
                api.sendMessage(finalResponse, event.threadID, (err, responseMessageInfo) => {
                    if (err) {
                        console.error('Error sending final response:', err);
                        return;
                    }

                    setTimeout(() => {
                        api.unsendMessage(responseMessageInfo.messageID);
                    }, 6000);
                });
            }).catch(error => {
                console.error('Error:', error);
                api.sendMessage(formatFont('An error occurred while fetching the response.'), event.threadID, (err, errorMessageInfo) => {
                    if (!err) {
                        setTimeout(() => {
                            api.unsendMessage(errorMessageInfo.messageID);
                        }, 6000);
                    }
                });
            });
        } catch (error) {
            console.error('Error:', error);
            api.sendMessage(formatFont('An error occurred while fetching the response.'), event.threadID, (err, errorMessageInfo) => {
                if (!err) {
                    setTimeout(() => {
                        api.unsendMessage(errorMessageInfo.messageID);
                    }, 6000);
                }
            });
        }
    });
};
  
