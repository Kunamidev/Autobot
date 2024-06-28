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
  name: "research",
  version: "1.0.0",
  role: 0,
  hasPrefix: true,
  credits: "August Quinn",
  description: "Search for research articles on Arxiv.",
  commandCategory: "Information Retrieval",
  usage: ["research [query]"],
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const query = args.join(' ');

  if (!query) {
    api.sendMessage('Please provide a search query for Arxiv.', threadID, (err, messageInfo) => {
      if (!err) {
        setTimeout(() => {
          api.unsendMessage(messageInfo.messageID);
        }, 6000);
      }
    });
    return;
  }

  try {
    const response = await axios.get(`https://gpt4withcustommodel.onrender.com/arxiv?query=${encodeURIComponent(query)}`);
    const data = response.data;

    if (!data.title) {
      api.sendMessage('No research articles found on Arxiv for the given query.', threadID, (err, messageInfo) => {
        if (!err) {
          setTimeout(() => {
            api.unsendMessage(messageInfo.messageID);
          }, 6000);
        }
      });
      return;
    }

    const { title, authors, published, summary } = data;

    const responseMessage = formatFont(`📚 Arxiv Research Article\n\n📝 Title: ${title}\n\n👥 Authors: ${authors.join(', ')}\n\n🗓️ Published Date: ${published}\n\n📖 Summary: ${summary}`);

    api.sendMessage(responseMessage, threadID, (err, messageInfo) => {
      if (!err) {
        setTimeout(() => {
          api.unsendMessage(messageInfo.messageID);
        }, 6000);
      }
    });
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while fetching Arxiv data.', threadID, (err, messageInfo) => {
      if (!err) {
        setTimeout(() => {
          api.unsendMessage(messageInfo.messageID);
        }, 6000);
      }
    });
  }
};
  
