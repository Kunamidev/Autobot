const moment = require("moment-timezone");
const axios = require('axios');

const fontMapping = {
  a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
  n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
  A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
  N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
};

function formatFont(text) {
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
    name: "ai2",
    version: "1.0.0",
    hasPermission: 0,
    credits: "heru",
    description: "ask to ai2",
    usePrefix: false,
    commandCategory: "ai2",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage(formatFont('(❓) Please provide a question first.'), event.threadID, messageID);
        }
        api.sendMessage(formatFont('(⌛) Searching please wait...'), event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4-32k-0314`;
        const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(formatFont(`🎓 Ai2 Answer\n━━━━━━━━━━━━━━━━\n\n🖋️ Ask: '${prompt}'\n\nAnswer: ${generatedText}\n\n🗓️ | ⏰ 𝙳𝚊𝚝𝚎 & 𝚃𝚒𝚖𝚎:\n.⋅ ۵ ${formattedDateTime} ۵ ⋅.\n\n━━━━━━━━━━━━━━━━`), event.threadID, messageID);
        } else {
            //console.error('API response did not contain expected data:', response.data);
            api.sendMessage(formatFont(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`), event.threadID, messageID);
        }
    } catch (error) {
        //console.error('Error:', error);
        api.sendMessage(formatFont(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`), event.threadID, event.messageID);
    }
};
  