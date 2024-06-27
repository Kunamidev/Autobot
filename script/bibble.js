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
    name: 'bible',
    version: '1.0.0',
    role: 0,
    credits: 'heru | rona',
    description: 'Get a random Bible verse.',
    hasPrefix: false,
    aliases: ['bibleverse', 'bibble'],
    usage: '',
    cooldown: 5,
};

module.exports.run = async function({ api, event }) {
    try {
        api.sendMessage('⌛ | 𝙵𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚛𝚊𝚗𝚍𝚘𝚖 𝚋𝚒𝚋𝚕𝚎 𝚟𝚎𝚛𝚜𝚎....', event.threadID, async (err, messageInfo) => {
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
                const response = await axios.get('https://deku-rest-api-gadz.onrender.com/bible');
                const verse = response.data.verse;
                const reference = response.data.reference;

                const message = `📖 ${formatFont(verse)}\n- ${formatFont(reference)}`;

                // Edit the initial message with the final response
                api.editMessage(message, messageID, (err) => {
                    if (err) {
                        console.error('Error editing message:', err);
                    }
                });

                // Set "✅" reaction to the initial message
                api.setMessageReaction('✅', messageID, (err) => {
                    if (err) {
                        console.error('Error setting reaction:', err);
                    }
                });
            } catch (error) {
                console.error('Error:', error);
                api.sendMessage('An error occurred while fetching the Bible verse.', event.threadID);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage('An error occurred while processing your request.', event.threadID);
    }
};
        
