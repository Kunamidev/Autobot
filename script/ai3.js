const { get } = require('axios');
const url = "https://markdevs-api.onrender.com";

module.exports.config = {
    name: "ai3",
    version: "1.0.0",
    hasPermission: 0,
    credits: "heru",
    description: "ask to ai3",
    usePrefix: false,
    commandCategory: "ai3",
    cooldowns: 5,
};

module.exports.run = async function({ event, args, api }) {
    const { threadID, messageID, senderID } = event;
    let prompt = args.join(' ');

    if (!prompt) {
        return api.sendMessage("Please provide a question first.", threadID, messageID);
    }

    const pending = await api.sendMessage("⏳ | Please bear with me while I ponder your request...", threadID, messageID);

    try {
        const res = await get(`${url}/gpt4?prompt=${encodeURIComponent(prompt)}&uid=${senderID}`);
        const answer = res.data.gpt4;

        return api.sendMessage(`🌺 𝐑𝐎𝐍𝐀 𝐀𝐈 𝐯.1\n━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${prompt}\n━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n━━━━━━━━━━━━━━━━━━\n🌺 𝚁𝚘𝚗𝚊 𝚊𝚞𝚝𝚘𝚋𝚘𝚝 𝟎.𝟎.𝟏`, threadID, pending.messageID);
    } catch (e) {
        return api.sendMessage(e.message, threadID, messageID);
    }
};
            
