module.exports.config = {
 name: "join",
 version: "1.0.1",
};

module.exports.handleEvent = async function({ api, event, client, global }) {
 const { threadID, logMessageData } = event;
 const { fs, request } = global.nodemodule;
 const { PREFIX, BOTNAME } = global.config;

 try {
	if (logMessageData.addedParticipants.some((i) => i.userFbId == api.getCurrentUserID())) {
	 api.changeNickname(
		`》 ${PREFIX} 《 ❃ ➠${!BOTNAME ? " " : BOTNAME}`,
		threadID,
		api.getCurrentUserID()
	 );

	 const welcomeMessage = `🔴🟡🟢\n\n✅ Connected successfully!....\n•──────────────────•\n→ Admin: Heru Dev\n→ Facebook: https://www.facebook.com/100077070762554\n\nUsage: ${PREFIX}help\nUse ${PREFIX}callad if there is an error to the Bot the bot admin will try to fix this as soon as possible\n→ Thank you for using this bot, have fun using it.`;

	 api.sendMessage(
		{
		 body: welcomeMessage,
		 attachment: fs.createReadStream(__dirname + "/cache/hi.png")
		},
		threadID
	 );
	} else {
	 const { threadName, participantIDs } = await api.getThreadInfo(threadID);
	 const threadData = global.data.threadData.get(parseInt(threadID)) || {};

	 for (let newParticipant of logMessageData.addedParticipants) {
		const userID = newParticipant.userFbId;
		if (userID === api.getCurrentUserID()) continue;

		const data = await api.getUserInfo(userID);
		const userName = data[userID].name.replace("@", "");

		const mentions = [{ tag: userName, id: userID, fromIndex: 0 }];
		const memLength = participantIDs.length;

		let msg =
		 typeof threadData.customJoin === "undefined"
			? `Hello ${userName}! Welcome to ${threadName}\nYou're the ${memLength}th member of this group, please enjoy!❤️🥳️`
			: threadData.customJoin
				.replace(/\{uName}/g, userName)
				.replace(/\{soThanhVien}/g, memLength);

		function fetchAndSendWelcomeGif() {
		 try {
			const welcomeGifUrl = `https://i.imgur.com/wJBoiIH.gif`;
			const options = {
			 uri: encodeURI(welcomeGifUrl),
			 method: "GET",
			};

			const callback = function () {
			 return api.sendMessage(
				{
				 body: msg,
				 attachment: fs.createReadStream(__dirname + `/cache/welcome.gif`),
				 mentions,
				},
				threadID,
				() => {
				 fs.unlinkSync(__dirname + `/cache/welcome.gif`);
				}
			 );
			};

			request(options)
			 .pipe(fs.createWriteStream(__dirname + `/cache/welcome.gif`))
			 .on("close", callback);
		 } catch (err) {
			return console.log("ERROR: " + err);
		 }
		}
		fetchAndSendWelcomeGif();
	 }
	}
 } catch (err) {
	console.log("ERROR: " + err);
 }
};
