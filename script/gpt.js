const { get } = require('axios');

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
  name: 'gpt',
  credits: "heru",
  version: '1.0.0',
  role: 0,
  aliases: ["Gpt"],
  cooldown: 0,
  hasPrefix: false,
  usage: "",
};

module.exports.run = async function ({ api, event, args }) {
  const question = args.join(' ');

  if (!question) {
    api.sendMessage("(❓) 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗 𝚏𝚒𝚛𝚜𝚝.", event.threadID, (err, messageInfo) => {
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

  api.sendMessage('(⌛) 𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...', event.threadID, async (err, messageInfo) => {
    if (err) {
      console.error('Error sending initial message:', err);
      return;
    }

    const messageID = messageInfo.messageID;
    setTimeout(() => {
      api.unsendMessage(messageID);
    }, 6000);

    try {
      const response = await get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(question)}`);
      const formattedResponse = formatFont('🌺 𝐑𝐨𝐧𝐚 𝐆𝐩𝐭:\n\n' + response.data.reply);

      // Send the final response as a new message
      api.sendMessage(formattedResponse, event.threadID, (err, responseMessageInfo) => {
        if (err) {
          console.error('Error sending final response message:', err);
          return;
        }
        setTimeout(() => {
          api.unsendMessage(responseMessageInfo.messageID);
        }, 6000);
      });
    } catch (error) {
      api.sendMessage(formatFont("An error occurred: " + error.message), event.threadID, (err, errorMessageInfo) => {
        if (!err) {
          setTimeout(() => {
            api.unsendMessage(errorMessageInfo.messageID);
          }, 6000);
        }
      });
    }
  });
};
  
