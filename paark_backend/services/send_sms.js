const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const smsNotification = require("../utils/smsNotificationMssage");

const sendSmsNotificationOptions = (code, phone) => ({
  body: smsNotification.bookingNotificationSms(code),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

const sendUserCarBackNotificationOptions = (address, dropBackCode, phone) => ({
  body: smsNotification.carBackNotificationSms(address, dropBackCode),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

const sendNewReservationNotificationOptions = () => ({
  body: smsNotification.newReservationNotificationSms(),
  from: process.env.PAARK_RESERVATION,
  to: `+33${process.env.VALET_NUMBER}`,
});

const sendUserReservationNotificationOptions = (
  phone,
  hour,
  address,
  dropOffCode
) => ({
  body: smsNotification.userReservationNotificationSms(
    hour,
    address,
    dropOffCode
  ),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

module.exports = {
  sendSmsNotification: (code, phone) => {
    client.messages
      .create(sendSmsNotificationOptions(code, phone))
      .then((res) => {
        return res.status === "sent";
      });
  },
  sendUserReservationNotification: (phone, hour, address, dropOffCode) => {
    client.messages
      .create(
        sendUserReservationNotificationOptions(
          phone,
          hour,
          address,
          dropOffCode
        )
      )
      .then((res) => {
        return res.status === "sent";
      });
  },
  sendUserCarBackNotification: (address, dropBackCode, phone) => {
    client.messages
      .create(sendUserCarBackNotificationOptions(address, dropBackCode, phone))
      .then((res) => {
        return res.status === "sent";
      });
  },
  sendNewReservationNotification: () => {
    client.messages
      .create(sendNewReservationNotificationOptions())
      .then((res) => {
        return res.status === "sent";
      })
      .catch((err) => console.log(err));
  },
};
