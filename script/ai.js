const axios = require('axios');

module.exports.config = {
    name: 'ai',
    version: '1.0.0',
    role: 0,
    hasPrefix: false,
    aliases: ['heru'],
    description: 'AI Command',
    usage: 'ai [query]',
    credits: 'developer',
    cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
    const query = args.join(' ');

    if (!query) {
        api.sendMessage('Please provide a question example:\nai what is love?', event.threadID, event.messageID);
        return;
    }

    api.sendMessage('Searching for an answer please wait....', event.threadID, event.messageID);

    try {
        
        const aiResponse = await axios.get('https://markdevs-api.onrender.com/gpt4', {
            params: { prompt: query, uid: event.senderID }
        });
        const aiData = aiResponse.data.gpt4;

        
        api.getUserInfo(event.senderID, (err, result) => {
            if (err) {
                console.error('Error fetching user info:', err);
                api.sendMessage('An error occurred while fetching the user info.', event.threadID, event.messageID);
                return;
            }

            const userName = result[event.senderID].name;

            // Send the combined response
            const finalResponse = `**${aiData}**\n\nQuestion asked by: ${userName}`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        });
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage('An error occurred while fetching the response.', event.threadID, event.messageID);
    }
};
                                         
