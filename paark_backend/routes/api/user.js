const router = require("express").Router();
const randomNumber = require("../../utils/randomDigitNumber.js");
const stripeCustomer = require("../../utils/stripeCustomer.js");
const sendSMS = require("../../services/send_sms");
const User = require("../../models/user");
const Ride = require("../../models/ride");

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
    await Ride.findOne({ userId: user._id }, async (err, userRideDoc) => {
      // do not register a ride for the user if he already has one on going
      if (userRideDoc.status === "ongoing") {
        res.status(200).json({
          user: {
            user_id: user._id,
            isConfirmed: user.isConfirmed,
            hasRide: userRideDoc.status === "ongoing",
          },
          message: "Vous avez déja réserver un voiturier.",
        });
      } else {
        // update user ride with new ride data even if the user is not confirmed
        await Ride.findOneAndUpdate(
          { userId: user._id, status: "registered" },
          { dropOffLocation: label, dropOffTime: time },
          {
            new: true,
            upsert: true, // Make this update into an upsert
          },
          async (err) => {
            if (err) {
              res.status(400).json({
                message: "Un probleme est survenue, veuillez réessayer.",
              });
            } else {
              if (!user.isConfirmed) {
                await User.findOneAndUpdate(
                  { _id: user.id },
                  { confirmedCode },
                  {
                    new: true,
                  },
                  async (err, updatedUser) => {
                    if (err) {
                      res.status(400).json({
                        message:
                          "Un probleme est survenue, veuillez réessayer.",
                      });
                    } else {
                      // send confirmed code to the user via SMS
                      // const isSent = sendSMS.sendSmsNotification(
                      //   confirmedCode,
                      //   formattedPhone(phone)
                      // );

                      if (updatedUser) {
                        // console.log(updatedUser);
                        res.status(200).json({
                          user: {
                            user_id: updatedUser._id,
                            isConfirmed: updatedUser.isConfirmed,
                          },
                          message: `Entrez le code reçu par SMS au ${updatedUser.phone} :`,
                        });
                      } else {
                        res.status(400).json({
                          message:
                            "Un probleme est survenue, veuillez réessayer.",
                        });
                      }
                    }
                  }
                ).clone();
              }
              if (user.isConfirmed) {
                res.status(200).json({
                  user: { user_id: user._id, isConfirmed: user.isConfirmed },
                  message: "",
                });
              }
            }
          }
        ).clone();
      }
    }).clone();
  } else {
    const user = new User({
      firstname,
      phone,
      isConfirmed: false,
      confirmedCode,
    });
    const newUser = await user.save();

    if (newUser) {
      const newRide = new Ride({
        dropOffLocation: label,
        dropOffTime: time,
        userId: user._id,
      });

      const saveRide = await newRide.save();

      if (saveRide) {
        // send confirmed code to the user via SMS
        // const isSent = sendSMS.sendSmsNotification(
        //   confirmedCode,
        //   formattedPhone(phone)
        // );

        if (saveRide) {
          res.status(200).json({
            user: {
              user_id: newUser.id,
              isConfirmed: newUser.isConfirmed,
              hasRide: false,
            },
            message: `Entrez le code reçu par SMS au ${newUser.phone} :`,
          });
        } else {
          res.status(400).json({
            user: { firstname: newUser.firstname },
            message: "Un probleme est survenue, veuillez réessayer.",
          });
        }
      } else {
        res.status(400).json({
          user: { firstname: newUser.firstname },
          message: "Un probleme est survenue, veuillez réessayer.",
        });
      }
    } else {
      res.status(400).json({
        user: { firstname: newUser.firstname },
        message: "Un probleme est survenue, veuillez réessayer.",
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
    userData: { user_id },
  } = req.body.data;

  const user = await User.findOne({ _id: user_id });

  if (code && user) {
    const isValidCode = user.confirmedCode === Number(code);

    if (isValidCode) {
      const createdCustomer = await stripeCustomer.createCustomer({
        name: user.firstname,
        phone: user.phone,
      });

      if (createdCustomer) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user_id },
          { isConfirmed: true, stripeCustomerId: createdCustomer.id },
          {
            new: true,
          }
        );
        if (updatedUser) {
          res.status(200).json({
            user: {
              user_id: updatedUser._id,
              isConfirmed: updatedUser.isConfirmed,
            },
            message: "",
          });
        }
      } else {
        res.status(200).json({
          user: { id: user._id, isConfirmed: user.isConfirmed },
          message: "Un probleme est survenue, veuillez réessayer.",
        });
      }
    } else {
      res.status(200).json({
        user: { id: user._id, isConfirmed: user.isConfirmed },
        message: "Code incorrect veuillez réessayer.",
      });
    }
  } else {
    res.status(200).json({
      user: { id: user._id, isConfirmed: user.isConfirmed },
      message: "Un probleme est survenue, veuillez réessayer.",
    });
  }
});

module.exports = router;
