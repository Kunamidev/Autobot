module.exports.config = {
  name: "uid",
  role: 0,
  credits: "Mirai Team",
  description: "Get the user's Facebook UID.",
  hasPrefix: false,
  usages: "{p}uid {p}uid @mention",
  cooldown: 5,
  aliases: ["id", "ui"]
};

module.exports.run = async function({ api, event }) {
  if (Object.keys(event.mentions).length === 0) {
    if (event.messageReply) {
      const senderID = event.messageReply.senderID;
      api.sendMessage(senderID, event.threadID, (err, messageInfo) => {
        if (err) return console.error(err);

        // Auto unsend the message after 6 seconds
        setTimeout(() => {
          api.deleteMessage(messageInfo.messageID);
        }, 6000);
      });
    } else {
      api.sendMessage(`${event.senderID}`, event.threadID, (err, messageInfo) => {
        if (err) return console.error(err);

        // Auto unsend the message after 6 seconds
        setTimeout(() => {
          api.deleteMessage(messageInfo.messageID);
        }, 6000);
      }, event.messageID);
    }
  } else {
    for (const mentionID in event.mentions) {
      const mentionName = event.mentions[mentionID];
      api.sendMessage(`${mentionName.replace('@', '')}: ${mentionID}`, event.threadID, (err, messageInfo) => {
        if (err) return console.error(err);

        // Auto unsend the message after 6 seconds
        setTimeout(() => {
          api.deleteMessage(messageInfo.messageID);
        }, 6000);
      });
    }
  }
};
