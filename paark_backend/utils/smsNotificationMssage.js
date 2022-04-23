module.exports = {
  bookingNotificationSms: (code) =>
    `Votre code de vérification Paark est ${code}.`,
  carBackNotificationSms: (address) =>
    `Votre véhicule est pris en charge par un voiturier Paark, il vous contactera dès son arrivée à l'adresse : mila ${address}.`,
};
