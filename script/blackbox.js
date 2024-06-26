const { get } = require('axios');
const url = "https://joshweb.click/blackbox";

module.exports = {
    config: {
        name: 'blackbox',
        version: '1.0.0',
        role: 0,
        hasPrefix: false,
        aliases: ['blak', 'box', 'bb'],
        description: 'ask blackbox ai',
        usage: 'blackbox [question]',
        credits: 'heru | rona',
        cooldown: 3,
    },
    run: async function({ api, event, args, chat }) {
        const bulag = args.join(' ');

        if (!bulag) {
            api.sendMessage('Please provide a question.', event.threadID, event.messageID);
            return;
        }

        const pending = await chat.reply('⌛ | Searching, please wait...', event.threadID, event.messageID);

        try {
            const pangit = await get(url, {
                params: { prompt: bulag }
            });
            const mapanghi = pangit.data;

            const responseString = mapanghi.data ? mapanghi.data : JSON.stringify(mapanghi, null, 2);

            await chat.edit(`👻 𝗕𝗹𝗮𝗰𝗸𝗯𝗼𝘅 𝗔𝗜\n━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${bulag}\n━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${responseString}\n━━━━━━━━━━━━━━━━━━`, pending.messageID);
            await api.setMessageReaction('✅', event.messageID, (err) => {
                if (err) console.error(err);
            });

        } catch (error) {
            console.error('Error:', error);
            api.sendMessage('An error occurred while fetching the response.', event.threadID, event.messageID);
            await api.setMessageReaction('❌', event.messageID, (err) => {
                if (err) console.error(err);
            });
        }
    }
};
          
