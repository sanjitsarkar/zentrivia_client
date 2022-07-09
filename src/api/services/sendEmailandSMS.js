const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

async function sendScheduledSms(sendTime, body, toPhoneNo) {
  const sendWhen = new Date(sendTime).toISOString();
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  const message = await client.messages.create({
    from: messagingServiceSid,
    to: toPhoneNo,
    body,
    scheduleType: "fixed",
    sendAt: sendWhen,
  });
  return message.sid;
}

const sendEmailandSMS = async (
  sendTime,
  from,
  to,
  title,
  message,
  toPhoneNo
) => {
  const msg = {
    to,
    from,
    subject: "You have a reminder for " + title,
    html: `
    ${title}
    ${message}
    `,
  };

  return sendScheduledSms(sendTime, title + " " + message, toPhoneNo);
};

module.exports = {
  sendEmailandSMS,
};
