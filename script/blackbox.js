const axios = require('axios');

module.exports.config = {
    name: 'blackbox',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['blackbox', 'black', 'box'],
    description: 'nigga black',
    usage: 'blackbox tas tanong bugok',
    credits: 'heru',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const bulag = args.join(' ');

    if (!bulag) {
        api.sendMessage('Please provide a question.', event.threadID, event.messageID);
        return;
    }

    const initialMessage = await new Promise((resolve, reject) => {
        api.sendMessage('Searching, please wait...', event.threadID, (err, info) => {
            if (err) return reject(err);
            resolve(info);
        });
    });

    try {
        const pangit = await axios.get('https://joshweb.click/blackbox', {
            params: { prompt: bulag }
        });
        const mapanghi = pangit.data;

        const responseString = mapanghi.data ? mapanghi.data : JSON.stringify(mapanghi, null, 2);

        api.editMessage(responseString, initialMessage.messageID, (err) => {
            if (err) {
                console.error('Error editing message:', err);
                api.sendMessage('An error occurred while editing the message.', event.threadID, event.messageID);
            }
        });

    } catch (error) {
        console.error('Error:', error);
        api.sendMessage('An error occurred while fetching the response.', event.threadID, initialMessage.messageID);
    }
};
