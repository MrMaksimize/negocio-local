var webhookMocks = {};
webhookMocks.twilioSMS = {
	data: {
		AccountSid: "ACe0c25418c2742c5b49f8f8041899b360",
		ApiVersion: "2010-04-01",
		Body: "Gh",
		From: "+17736777755",
		FromCity: "CHICAGO",
		FromCountry: "US",
		FromState: "IL",
		FromZip: "60712",
		MessageSid: "SMb251b49a699fa9de11360ab633e48632",
		NumMedia: "0",
		SmsMessageSid: "SMb251b49a699fa9de11360ab633e48632",
		SmsSid: "SMb251b49a699fa9de11360ab633e48632",
		SmsStatus: "received",
		To: "+19164263342",
		ToCity: "",
		ToCountry: "US",
		ToState: "CA",
		ToZip: ""
	},
	headers: {
		Accept: "*/*",
		CacheControl: "max-age=259200",
		Connection: "close",
		ContentLength: "378",
		ContentType: "application/x-www-form-urlencoded",
		UserAgent: "TwilioProxy/1.1",
		XTwilioSignature: "qanDgm2we3SIu2PvTLju9gmOPvc="
	}
};

module.exports = webhookMocks;



