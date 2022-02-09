const router = require("express").Router();
const randomNumber = require("../../utils/randomDigitNumber.js");
const sendSMS = require("../../services/send_sms");
const User = require("../../models/user");

const formattedPhone = (phone) => parseInt(phone);
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
        const isSent = sendSMS.sendSmsNotification(
          confirmedCode,
          formattedPhone(phone)
        );

        if (isSent) {
          res.status(200).json({
            user: { phone: user.phone, isConfirmed: user.isConfirmed },
            message: `Entrez le code reçu par SMS au ${user.phone} :`,
          });
        } else {
          res.status(400).json({
            message: "Un probleme est survenue, réessayer plus tard.",
          });
        }
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
      const isSent = sendSMS.sendSmsNotification(
        confirmedCode,
        formattedPhone(phone)
      );

      if (isSent) {
        res.status(200).json({
          user: { phone: newUser.phone, isConfirmed: newUser.isConfirmed },
          message: `Entrez le code reçu par SMS au ${newUser.phone} :`,
        });
      }
    } else {
      res.status(400).json({
        user: { firstname: newUser.firstname },
        message: "Un probleme est survenue, réessayer plus tard.",
      });
    }
  }
});

// @route POST /api/user/user-information
// @description confirm user phone
// @access Public
router.post("/confirm-user-phone", async (req, res) => {
  const {
    code,
    userData: { phone },
  } = req.body.data;

  const user = await User.findOne({ phone });
  if (code) {
    const isValidCode = user.confirmedCode === Number(code);

    if (user && isValidCode) {
      const isUpdate = await User.findOneAndUpdate(
        { phone },
        { isConfirmed: true },
        {
          new: true,
        }
      );

      res.status(200).json({
        user: { phone: user.phone, isConfirmed: user.isConfirmed },
        message: "",
      });
    } else {
      res.status(400).json({
        user: { phone: user.phone, isConfirmed: user.isConfirmed },
        message: "Code incorrect veuillez réessayer.",
      });
    }
  } else {
    res.status(400).json({
      user: { phone: user.phone, isConfirmed: user.isConfirmed },
      message: "Un probleme est survenue, réessayer plus tard.",
    });
  }
});

module.exports = router;
