module.exports = {
  bookingNotificationSms: (code) =>
    `Votre code de vérification Paark est ${code}.`,
  userReservationNotificationSms: (hour, address, dropOffCode) =>
    `Votre réservation Paark est confirmée pour ${hour} à l'adresse : ${address}. 
    \n \n Votre code d’authentification est : ${dropOffCode} 
    \n \n Pour des raisons de sécurité, assurez-vous que vous et votre voiturier avez bien le même code lors de la prise en charge.`,
  carBackNotificationSms: (address, dropBackCode) =>
    `Votre véhicule est pris en charge par un voiturier Paark, il vous contactera dès son arrivée à l'adresse : ${address}. 
    \n \n Votre code d’authentification est : ${dropBackCode}. 
    \n \n Il vous sera demandé par le voiturier pour vous identifier en tant que propriétaire et garantir une passation plus sécurisée.`,
  newReservationNotificationSms: () =>
    "Une nouvelle réservation a été effectuée veuillez consulter le tableau de bord.",
};
