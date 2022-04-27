const router = require("express").Router();
const { sendEmail } = require("../../services/send_email");

router.post("/send-support-message", async (req, res) => {
  const { firstname, email, message } = req.body.data;
  sendEmail(firstname, email, message)
    .then(() =>
      res.status(200).json({
        message: "Merci, votre message a bien été envoyé !",
      })
    )
    .catch(() =>
      res.status(400).json({
        message: "Un probleme est survenue, veuillez réessayer.",
      })
    );
});

module.exports = router;
