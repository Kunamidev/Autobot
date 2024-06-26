const axios = require('axios');

module.exports.config = {
    name: 'bibble',
    version: '1.0.0',
    role: 0,
    credits: 'heru | rona',
    description: 'Get a random Bible verse.',
    hasPrefix: false,
    aliases: ['bibleverse', 'bibble'],
    usage: '',
    cooldown: 5,
};

module.exports.run = async function({ api, event, chat }) {
    try {
        const pending = await chat.reply('⏱️ | Fetching a random Bible verse, please wait...', event.threadID, event.messageID);

        const response = await axios.get('https://deku-rest-api-gadz.onrender.com/bible');
        const verse = response.data.verse;
        const reference = response.data.reference;

        const message = `📖 ${verse}\n- ${reference}`;

        await chat.edit(message, pending.messageID);
        await api.setMessageReaction('✅', event.messageID, (err) => {
            if (err) console.error(err);
        });

    } catch (error) {
        console.error('Error:', error);
        await chat.edit('An error occurred while fetching the Bible verse.', pending.messageID);
        await api.setMessageReaction('❌', event.messageID, (err) => {
            if (err) console.error(err);
        });
    }
};
    
