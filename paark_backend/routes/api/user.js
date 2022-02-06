const router = require("express").Router();
const randomNumber = require("../../utils/randomDigitNumber.js");
const User = require("../../models/user");

// @route POST /api/user/user-information
// @description user information
// @access Public
router.post("/user-information", async (req, res) => {
  const {
    phone,
    destination: { label },
    firstname,
    time,
  } = req.body.data;

  const confirmedCode = randomNumber.randomFourDigitNumber();

  const user = await User.findOne({ phone });
  if (user) {
    if (!user.isConfirmed) {
      const isUpdate = await User.findOneAndUpdate(
        { phone },
        { confirmedCode },
        {
          new: true,
        }
      );

      if (isUpdate) {
        // send confirmed code to the user via SMS
        res.status(200).json({
          user: { phone: user.phone, isConfirmed: user.isConfirmed },
          message: `Entrez le code reçu par SMS au ${user.phone} :`,
        });
      } else {
        res.status(400).json({
          message: "Un probleme est survenue, réessayer plus tard.",
        });
      }
    }
    if (user.isConfirmed) {
      res.status(200).json({
        user: { phone: user.phone, isConfirmed: user.isConfirmed },
        message: `Étape 3 : paiement + message de nouvelle course.`,
      });
    }
  } else {
    const user = new User({
      firstname,
      phone,
      isConfirmed: false,
      confirmedCode,
    });
    const newUser = await user.save();
    if (newUser) {
      // send confirmed code to the user via SMS

      // if (isSend && isSend.accepted) {
      res.status(200).json({
        user: { phone: newUser.phone, isConfirmed: newUser.isConfirmed },
        message: `Entrez le code reçu par SMS au ${newUser.phone} :`,
      });
      // } else {
      //   res.status(400).json({
      //     user: { firstname: newUser.firstname },
      //     message: "Un probleme est survenue, réessayer plus tard.",
      //   });
      // }
    } else {
      res.status(400).json({
        user: { firstname: newUser.firstname },
        message: "Un probleme est survenue, réessayer plus tard.",
      });
    }
  }
});

module.exports = router;
