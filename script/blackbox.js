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
    description: 'Ask blackbox Ai',
    usage: 'blackbox [question]',
    credits: 'heru',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args, chat }) {
    const rona = args.join(' ');

    if (!rona) {
        api.sendMessage(formatFont('(❓) Please provide a question first.', event.threadID, event.messageID);
        return;
    }

    const pendingMessage = await new Promise((resolve, reject) => {
        api.sendMessage(formatFont('(⌛) Searching please wait...', event.threadID, (err, messageInfo) => {
            if (err) return reject(err);
            resolve(messageInfo);
        });
    });

    try {
        const heru = await axios.get('https://joshweb.click/blackbox', {
            params: { prompt: rona }
        });
        const love = heru.data;

        const responseString = love.data ? love.data : JSON.stringify(love, null, 2);
        const formattedResponse = formatFont(responseString);

        api.editMessage(formattedResponse, pendingMessage.messageID);

    } catch (error) {
        console.error(formatFont('Error:', error);
        api.editMessage(formatFont('An error occurred while fetching the response.', pendingMessage.messageID);
    }
};
      
