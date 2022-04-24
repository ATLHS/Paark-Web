const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
import {
  confirmationCodeMessage,
  userConfirmedReservationMessage,
  userConfirmedCarBackMessage,
  adminNewReservationAlertMessage,
} from "../utils/smsNotificationMssage";

const confirmationCodeOptions = (code, phone) => ({
  body: confirmationCodeMessage(code),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

const userConfirmedReservationOptions = (
  phone,
  hour,
  address,
  dropOffCode
) => ({
  body: userConfirmedReservationMessage(hour, address, dropOffCode),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

const userConfirmedCarBackOptions = (address, dropBackCode, phone) => ({
  body: userConfirmedCarBackMessage(address, dropBackCode),
  from: process.env.PAARK,
  to: `+33${phone}`,
});

const adminNewReservationAlertOptions = () => ({
  body: adminNewReservationAlertMessage(),
  from: process.env.PAARK_RESERVATION,
  to: `+33${process.env.VALET_NUMBER}`,
});

export function sendConfirmationCodeSms(code, phone) {
  client.messages.create(confirmationCodeOptions(code, phone)).then((res) => {
    return res.status === "sent";
  });
}
export function sendUserConfirmedReservationSms(
  phone,
  hour,
  address,
  dropOffCode
) {
  client.messages
    .create(userConfirmedReservationOptions(phone, hour, address, dropOffCode))
    .then((res) => {
      return res.status === "sent";
    });
}
export function sendUserConfirmedCarBackSms(address, dropBackCode, phone) {
  client.messages
    .create(userConfirmedCarBackOptions(address, dropBackCode, phone))
    .then((res) => {
      return res.status === "sent";
    });
}
export function sendAdminNewReservationAlertSms() {
  client.messages.create(adminNewReservationAlertOptions()).then((res) => {
    return res.status === "sent";
  });
}
