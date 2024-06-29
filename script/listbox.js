module.exports.config = {
	name: "listbox",
	version: "1.0.0",
	credits: "Him",
	role: 0,
	description: "Lấy tên và id các nhóm chứa bot",
	hasPrefix: false,
	aliases: ["allbox"],
	usage: "allbox",
	cooldown: 5
};

module.exports.run = async function ({ api, event }) {
	let num = 0;
	let box = "";
	api.getThreadList(100, null, ["INBOX"], (err, list) => {
		if (err) return console.error(err);
		
		list.forEach(info => {
			if (info.isGroup && info.isSubscribed) {
				box += `${num += 1}. ${info.name} - ${info.threadID}\n`;
			}
		});
		
		api.sendMessage(box, event.threadID, (err, messageInfo) => {
			if (err) return console.error(err);

			// Auto unsend the message after 6 seconds
			setTimeout(() => {
				api.deleteMessage(messageInfo.messageID);
			}, 6000);
		}, event.messageID);
	});
};
