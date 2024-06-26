const {get} = require('axios');
const url = "https://markdevs-last-api-cvxr.onrender.com";
module.exports = {
    config: {
       name: "ai",
       version: "1.0.0",
       hasPermission: 0,
       credits: "unknown",
       description: "OpenAI official AI with no prefix",
       commandCategory: "education",
       usePrefix: false,
       usage: "[prompt]",
       cooldowns: 0
    },
    run: async function({ event, args, chat }){
            const { messageID } = event;
            let prompt = args.join(' '), id = event.senderID;
            if(!prompt) return chat.reply("Please provide a question first.");
            const pending = await chat.reply("⏳ | Searching please wait.....");
            //const pending1 = await chat.edit("✅ | Find answer!");
            try {
                const res = await get(url+"/gpt4?prompt="+prompt+"&uid="+id);
                const answer = res.data.gpt4;
                return chat.edit(`👻 𝗥𝗢𝗡𝗔 𝗔𝗜\n━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${prompt}\n━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n━━━━━━━━━━━━━━━━━━\n🌸𝚁𝚘𝚗𝚊 𝚊𝚞𝚝𝚘𝚋𝚘𝚝 𝚟.𝟎.𝟎.𝟏`,pending.messageID);
            } catch (e){
                return chat.reply(e.message)
            }
    }
    }
