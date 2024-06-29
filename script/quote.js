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
  name: "quote",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  description: "Get a random inspirational quote.",
  usage: "quote",
  credits: "Developer",
  cooldown: 0
};

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID } = event;
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const { content, author } = response.data;
    
    // Format the quote text using the formatFont function
    const formattedQuote = formatFont(`"${content}" - ${author}`);
    
    api.sendMessage(formattedQuote, threadID, (err, messageInfo) => {
      if (err) return console.error(err);

      // Auto unsend the message after 6 seconds
      setTimeout(() => {
        api.deleteMessage(messageInfo.messageID);
      }, 6000);
    }, messageID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch a quote at the moment. Please try again later.", threadID, (err, messageInfo) => {
      if (err) return console.error(err);

      // Auto unsend the error message after 6 seconds
      setTimeout(() => {
        api.deleteMessage(messageInfo.messageID);
      }, 6000);
    }, messageID);
  }
};
    
