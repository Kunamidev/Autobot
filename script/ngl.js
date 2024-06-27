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
  name: "ngl",
  version: "1.0.0",
  hasPermission: 0,
  credits: "heru",
  usePrefix: true,
  description: "Spam NGL messages",
  commandCategory: "Spam",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 3) {
      api.sendMessage('[ 𝙽𝙶𝙻 ] 𝙸𝚗𝚜𝚞𝚏𝚏𝚒𝚌𝚒𝚎𝚗𝚝 𝚊𝚛𝚐𝚞𝚖𝚎𝚗𝚝𝚜. 𝚄𝚜𝚊𝚐𝚎: 𝚗𝚐𝚕𝚜𝚙𝚊𝚖 [𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎] [𝚖𝚎𝚜𝚜𝚊𝚐𝚎] [𝚊𝚖𝚘𝚞𝚗𝚝]', event.threadID);
      return;
    }

    const username = args.shift();
    const message = args.slice(0, -1).join(" ");
    const spamCount = parseInt(args[args.length - 1]);

    if (isNaN(spamCount) || spamCount <= 0) {
      api.sendMessage('[ 𝙽𝙶𝙻 ] 𝙸𝚗𝚟𝚊𝚕𝚒𝚍 𝚊𝚖𝚘𝚞𝚗𝚝. 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚙𝚘𝚜𝚒𝚝𝚒𝚟𝚎 𝚗𝚞𝚖𝚋𝚎𝚛.', event.threadID);
      return;
    }

    const formattedMessage = formatFont(message);

    console.log(`[ 𝙽𝙶𝙻 ] 𝚂𝚙𝚊𝚖𝚖𝚒𝚗𝚐 𝚃𝚘 : ${username}`);
    for (let i = 0; i < spamCount; i++) {
      const response = await axios.post('https://ngl.link/api/submit', {
        username: username,
        question: formattedMessage,
        deviceId: '23d7346e-7d22-4256-80f3-dd4ce3fd8878',
        gameSlug: '',
        referrer: '',
      });

      console.log(`[ 𝙽𝙶𝙻 ] 𝙼𝚎𝚜𝚜𝚊𝚐𝚎 ${i + 1}: Status - ${response.status}`);
    }

    api.sendMessage(`[ 𝙽𝙶𝙻 ] 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝚜𝚙𝚊𝚖𝚖𝚎𝚍 ${spamCount} 𝚝𝚒𝚖𝚎𝚜 𝚝𝚘 ${username}`, event.threadID);
  } catch (error) {
    console.error('[ 𝙽𝙶𝙻 ] 𝙴𝚛𝚛𝚘𝚛:', error);
    api.sendMessage('[ 𝙽𝙶𝙻 ] 𝙴𝚛𝚛𝚘𝚛: ' + error.message, event.threadID);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});
