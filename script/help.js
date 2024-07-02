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
    name: 'help',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['help'],
    description: "Beginner's guide",
    usage: "help [page] or [command]",
    credits: 'heru',
};

module.exports.run = async function({ api, event, enableCommands, args, Utils, prefix }) {
    const input = args.join(' ');
    try {
        const eventCommands = enableCommands[1].handleEvent;
        const commands = enableCommands[0].commands;

        let helpMessage = `Command List:\n\n`;
        commands.forEach((c, i) => {
            helpMessage += `\t${i + 1}. ${prefix}${c}\n`;
        });
        helpMessage += `\nEvent List:\n\n`;
        eventCommands.forEach((e, i) => {
            helpMessage += `\t${i + 1}. ${prefix}${e}\n`;
        });
        helpMessage += `\nPage 1/1`;

        // Fetch a random cat fact
        const catFactResponse = await axios.get('https://catfact.ninja/fact');
        const catFact = catFactResponse.data.fact;

        // Append the cat fact to the help message
        helpMessage += `\n\n🐱 Cat Fact:\n\n${catFact}`;

        // Format the help message using the formatFont function
        const formattedHelpMessage = formatFont(helpMessage);

        if (!input) {
            api.sendMessage(formattedHelpMessage, event.threadID, (err, messageInfo) => {
                if (!err) {
                    setTimeout(() => {
                        api.unsendMessage(messageInfo.messageID);
                    }, 6000);
                }
            });
        } else if (input.toLowerCase() === 'cat') {
            api.sendMessage(`🐱 Cat Fact:\n\n${catFact}`, event.threadID, (err, messageInfo) => {
                if (!err) {
                    setTimeout(() => {
                        api.unsendMessage(messageInfo.messageID);
                    }, 6000);
                }
            });
        } else {
            api.sendMessage('Command not found.', event.threadID, (err, messageInfo) => {
                if (!err) {
                    setTimeout(() => {
                        api.unsendMessage(messageInfo.messageID);
                    }, 6000);
                }
            });
        }
    } catch (error) {
        console.log(error);
        api.sendMessage('An error occurred while processing your request.', event.threadID, (err, messageInfo) => {
            if (!err) {
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID);
                }, 6000);
            }
        });
    }
};

module.exports.handleEvent = async function({ api, event, prefix }) {
    const { threadID, messageID, body } = event;
    const message = prefix ? 'This is my prefix: ' + prefix : "Sorry, I don't have a prefix";
    if (body?.toLowerCase().startsWith('prefix')) {
        api.sendMessage(message, threadID, (err, messageInfo) => {
            if (!err) {
                setTimeout(() => {
                    api.unsendMessage(messageInfo.messageID);
                }, 6000);
            }
        });
    }
};
  
