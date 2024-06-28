const { get } = require('axios');
const url = "https://markdevs-last-api-cvxr.onrender.com";

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
    const { messageID } = event;
    let prompt = args.join(' '), id = event.senderID;
    if (!prompt) {
        return api.sendMessage("Please provide a question first.", event.threadID, messageID);
    }

    const pending = await api.sendMessage("⏳ | Please bear with me while I ponder your request...", event.threadID, messageID);

    try {
        const res = await get(url + "/gpt4?prompt=" + encodeURIComponent(prompt) + "&uid=" + id);
        const answer = res.data.gpt4;

        return api.editMessage(`🌺 𝐑𝐎𝐍𝐀 𝐀𝐈 𝐯.1\n━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${prompt}\n━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n━━━━━━━━━━━━━━━━━━\n🌺 𝚁𝚘𝚗𝚊 𝚊𝚞𝚝𝚘𝚋𝚘𝚝 𝟎.𝟎.𝟏`, pending.messageID);
    } catch (e) {
        return api.sendMessage(e.message, event.threadID, messageID);
    }
};
