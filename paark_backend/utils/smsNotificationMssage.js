module.exports = {
  bookingNotificationSms: (code) =>
    `Votre code de vérification Paark est ${code}.`,
  carBackNotificationSms: (address) =>
    `Votre véhicule est pris en charge par un voiturier Paark, il vous contactera dès son arrivée à l'adresse : ${address}.`,
  // userReservationConfirmedSms: (address) =>
  //   `Votre réservation Paark est confirmée pour ${hour} à l'adresse : ${address}. votre code de liaison est ${code}
  //   pour authentifier votre voiturier n'hesitez pas`,
  newReservationNotificationSms: () =>
    "Une nouvelle réservation a été effectuée veuillez consulter le tableau de bord.",
};
