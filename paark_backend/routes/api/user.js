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

  const registeredConfirmedCode = randomNumber.randomFourDigitNumber();

  const user = await User.findOne({ phone });

  if (user) {
    const userRideDoc = await Ride.find({
      userId: user._id,
    })
      .or([{ status: "En chemin" }, { status: "Pris en charge" }])
      .exec();
    // check if user already has on going ride or pickedup car
    if (userRideDoc.length) {
      res.status(200).json({
        user: {
          user_id: user._id,
          isConfirmed: user.isConfirmed,
          hasRide: true,
        },
        message: "Vous avez déja réserver un voiturier.",
      });
    } else {
      await Ride.findOne(
        {
          userId: user._id,
          status: "Enregistré",
        },
        async (err, ride) => {
          if (err)
            return res.status(400).json({
              message: "Un probleme est survenue, veuillez réessayer.",
            });

          if (ride) {
            ride.dropOffLocation = label;
            ride.dropOffTime = time;

            const updatedRide = await ride.save();
            if (updatedRide) {
              if (!user.isConfirmed) {
                await User.findOneAndUpdate(
                  { _id: user.id },
                  { registeredConfirmedCode },
                  {
                    new: true,
                  },
                  async (err, updatedUser) => {
                    if (err) {
                      return res.status(400).json({
                        message:
                          "Un probleme est survenue, veuillez réessayer.",
                      });
                    } else {
                      // send confirmed code to the user via SMS
                      const isSent = sendSMS.sendSmsNotification(
                        registeredConfirmedCode,
                        formattedPhone(phone)
                      );

                      if (updatedUser) {
                        return res.status(200).json({
                          user: {
                            user_id: updatedUser._id,
                            isConfirmed: updatedUser.isConfirmed,
                          },
                          message: `Entrez le code reçu par SMS au ${updatedUser.phone} :`,
                        });
                      } else {
                        return res.status(400).json({
                          message:
                            "Un probleme est survenue, veuillez réessayer.",
                        });
                      }
                    }
                  }
                ).clone();
              }
              if (user.isConfirmed) {
                return res.status(200).json({
                  user: { user_id: user._id, isConfirmed: user.isConfirmed },
                  message: "",
                });
              }
            } else {
              return res.status(400).json({
                message: "Un probleme est survenue, veuillez réessayer.",
              });
            }
          } else {
            // create new ride for confirmed user
            const newRide = new Ride({
              dropOffLocation: label,
              dropOffTime: time,
              userId: user._id,
            });

            const saveRide = await newRide.save();
            user.rides.push(saveRide);
            const savedUser = await user.save();

            if (savedUser) {
              return res.status(200).json({
                user: { user_id: user._id, isConfirmed: user.isConfirmed },
                message: "",
              });
            } else {
              return res.status(400).json({
                message: "Un probleme est survenue, veuillez réessayer.",
              });
            }
          }
        }
      ).clone();
    }
  } else {
    const user = new User({
      firstname,
      phone,
      isConfirmed: false,
      registeredConfirmedCode,
    });
    const newUser = await user.save();

    if (newUser) {
      const newRide = new Ride({
        dropOffLocation: label,
        dropOffTime: time,
        userId: user._id,
      });

      const saveRide = await newRide.save();
      user.rides.push(saveRide);
      const a = await user.save();

      if (saveRide) {
        // send confirmed code to the user via SMS
        const isSent = await sendSMS.sendSmsNotification(
          registeredConfirmedCode,
          formattedPhone(phone)
        );

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
    // if user phone is confirmed
    if (user.isConfirmed) {
      const isValidCode = user.getCarConfirmedCode === Number(code);

      if (isValidCode) {
        await Ride.findOneAndUpdate(
          { userId: user._id, status: "Pris en charge" },
          { isReturning: true },
          {
            new: true,
          },
          async (err, { dropBackLocation }) => {
            if (err) {
              return res.status(400).json({
                message: "Un probleme est survenue, veuillez réessayer.",
              });
            } else {
              // return res to the client and send SMS notification to the user and to the valet to bring the car back to the customer

              const isSent = sendSMS.sendUserCarBackNotification(
                dropBackLocation,
                formattedPhone(user.phone)
              );

              return res.status(200).json({
                user: {
                  user_id: user._id,
                },
                message:
                  "la restitution de votre véhicule a bien été enregistrée, un SMS de confirmation va vous être envoyés.",
              });
            }
          }
        ).clone();
      } else {
        return res.status(400).json({
          user: { id: user._id, isConfirmed: user.isConfirmed },
          message: "Code incorrect veuillez réessayer.",
        });
      }
    }
    // if user phone is not confirmed
    if (!user.isConfirmed) {
      const isValidCode = user.registeredConfirmedCode === Number(code);

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
          return res.status(200).json({
            user: { id: user._id, isConfirmed: user.isConfirmed },
            message: "Un probleme est survenue, veuillez réessayer.",
          });
        }
      } else {
        return res.status(200).json({
          user: { id: user._id, isConfirmed: user.isConfirmed },
          message: "Code incorrect veuillez réessayer.",
        });
      }
    }
  } else {
    return res.status(200).json({
      user: { id: user._id, isConfirmed: user.isConfirmed },
      message: "Un probleme est survenue, veuillez réessayer.",
    });
  }
});

// @route POST /api/user/user-information
// @description returning car process
// @access Public
router.post("/return-user-car", async (req, res) => {
  const {
    destination: { label },
    phone,
  } = req.body.data;

  const registeredConfirmedCode = randomNumber.randomFourDigitNumber();

  const user = await User.findOne({ phone });

  if (user) {
    const ride = await Ride.findOne({
      userId: user._id,
      status: "Pris en charge",
    });

    if (ride) {
      if (ride.isReturning) {
        return res.status(200).json({
          message:
            "Votre véhicule est déja en chemin vers votre position un voiturier Paark vous contatera des son arrivé.",
          status: null,
        });
      } else {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { getCarConfirmedCode: registeredConfirmedCode },
          {
            new: true,
          }
        );
        if (updatedUser) {
          await Ride.findOneAndUpdate(
            { userId: user._id, status: "Pris en charge" },
            { dropBackLocation: label },
            {
              new: true,
            },
            async (err, updatedRide) => {
              if (err) {
                res.status(400).json({
                  message: "Un probleme est survenue, veuillez réessayer.",
                });
              } else {
                const isSent = sendSMS.sendSmsNotification(
                  registeredConfirmedCode,
                  formattedPhone(phone)
                );

                return res.status(200).json({
                  user: {
                    user_id: user._id,
                    phone,
                  },
                  status: updatedRide.status,
                  message: `Entrez le code reçu par SMS au ${phone} :`,
                });
              }
            }
          ).clone();
        }
      }
    } else {
      return res.status(200).json({
        message:
          "Vous n'avez aucun véhicule pris en charge par un voiturier Paark.",
        status: null,
      });
    }
  } else {
    res.status(200).json({
      message: "Aucun utilisateur ne correspond au numéro indiqué.",
    });
  }
});

// @route POST /api/user/update-ride-status
// @description update user ride status
// @access Public
router.post("/update-ride-status", async (req, res) => {
  const { id, status } = req.body;

  await Ride.findOneAndUpdate(
    { _id: id },
    { status },
    {
      new: true,
    },
    async (err, updatedRide) => {
      if (err) {
        res.status(400).json({
          message: "Un probleme est survenue, veuillez réessayer.",
        });
      } else {
        // return res to the client and send a notification to bring the car back to the customer
        return res.status(200).json({ updatedRide });
      }
    }
  ).clone();
});

module.exports = router;
