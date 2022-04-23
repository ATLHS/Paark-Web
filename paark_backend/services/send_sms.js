const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const smsNotification = require("../utils/smsNotificationMssage");

const sendSmsNotificationOptions = (code, phone) => ({
  body: smsNotification.bookingNotificationSms(code),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

const sendUserCarBackNotificationOptions = (address, phone) => ({
  body: smsNotification.carBackNotificationSms(address, phone),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

const sendNewReservationNotificationOptions = () => ({
  body: smsNotification.newReservationNotificationSms(),
  from: process.env.PAARK_RESERVATION,
  to: `+33${process.env.VALET_NUMBER}`,
});

module.exports = {
  sendSmsNotification: (code, phone) => {
    client.messages
      .create(sendSmsNotificationOptions(code, phone))
      .then((res) => {
        return res.status === "sent";
      });
  },
  sendUserCarBackNotification: (address, phone) => {
    client.messages
      .create(sendUserCarBackNotificationOptions(address, phone))
      .then((res) => {
        return res.status === "sent";
      });
  },
  sendNewReservationNotification: () => {
    client.messages
      .create(sendNewReservationNotificationOptions())
      .then((res) => {
        return res.status === "sent";
      });
  },
};
