const axios = require('axios');

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

        if (!input) {
            let helpMessage = `Command List:\n\n`;
            commands.forEach((c, i) => {
                helpMessage += `\t${i + 1}. ${prefix}${c}\n`;
            });
            helpMessage += `\nEvent List:\n\n`;
            eventCommands.forEach((e, i) => {
                helpMessage += `\t${i + 1}. ${prefix}${e}\n`;
            });
            helpMessage += `\nPage 1/1`;
            api.sendMessage(helpMessage, event.threadID, event.messageID);
        } else if (input.toLowerCase() === 'bible') {
            // Fetch a random Bible verse
            const bibleResponse = await axios.get('https://deku-rest-api-gadz.onrender.com/bible');
            const bibleVerse = bibleResponse.data.verse;
            api.sendMessage(`📖 Bible Verse:\n\n${bibleVerse}`, event.threadID, event.messageID);
        } else {
            api.sendMessage('Command not found.', event.threadID, event.messageID);
        }
    } catch (error) {
        console.log(error);
        api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
};

module.exports.handleEvent = async function({ api, event, prefix }) {
    const { threadID, messageID, body } = event;
    const message = prefix ? 'This is my prefix: ' + prefix : "Sorry, I don't have a prefix";
    if (body?.toLowerCase().startsWith('prefix')) {
        api.sendMessage(message, threadID, messageID);
    }
};
