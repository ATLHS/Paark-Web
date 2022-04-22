module.exports = {
  bookingNotificationSms: (code) =>
    `Votre code de vérification Paark est ${code}.`,
  CarBackNotificationSms: (address) =>
    `Votre véhicule est pris en charge par un voiturier Paark il vous contactera des son arrivée à l'adresse : ${address}.`,
};
