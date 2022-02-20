const router = require("express").Router();
const Admin = require("../../models/admin");
const randomNumber = require("../../utils/randomDigitNumber.js");
const bcrypt = require("bcrypt");

// const sendEmail = require("../../services/send_email");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const saltRounds = 12;

// @route POST /api/admin/login
// @description admin login
// @access Public
router.post("/login", async (req, res) => {
  return res.send({ route: "login" });
});

router.post("/signup", async (req, res) => {
  const { email } = req.body.data;

  if (email !== ADMIN_EMAIL) {
    return res.status(400).json({
      message: "Adresse email non autorisé.",
      email,
    });
  }

  const adminExist = await Admin.findOne({ email });
  const registeredConfirmedCode = randomNumber.randomFourDigitNumber();
  if (adminExist) {
    if (!adminExist.emailConfirmed) {
      await Admin.findOneAndUpdate(
        { _id: adminExist.id },
        { registeredConfirmedCode },
        {
          new: true,
        },
        async (err, updatedAdminUser) => {
          if (err) {
            res.status(400).json({
              message: "Un probleme est survenue, veuillez réessayer.",
            });
          } else {
            // send confirmed code to the user via Email
            // const isSent = sendSMS.sendSmsNotification(
            //   registeredConfirmedCode,
            //   formattedPhone(phone)
            // );

            if (updatedAdminUser) {
              res.status(200).json({
                user: {
                  user_id: updatedAdminUser._id,
                  email: updatedAdminUser.email,
                  emailConfirmed: updatedAdminUser.emailConfirmed,
                },

                message: `Entrez le code reçu par email a l'adresse ${email} :`,
              });
            } else {
              res.status(400).json({
                message: "Un probleme est survenue, veuillez réessayer.",
              });
            }
          }
        }
      ).clone();
    }
    if (adminExist.emailConfirmed) {
      if (!adminExist.accountConfirmed) {
        res.status(200).json({
          user: {
            user_id: adminExist._id,
            email: adminExist.email,
            emailConfirmed: adminExist.emailConfirmed,
            accountConfirmed: adminExist.accountConfirmed,
          },
          message: "Indiquez un mot de passe.",
        });
      } else {
        res.status(200).json({
          user: {
            user_id: adminExist._id,
            email: adminExist.email,
            emailConfirmed: adminExist.emailConfirmed,
            accountConfirmed: adminExist.accountConfirmed,
          },
          message: `Un compte admin existe déjà avec l'adresse email ${adminExist.email}`,
        });
      }
    }
  } else {
    const admin = new Admin({
      email,
      emailConfirmed: false,
      registeredConfirmedCode,
    });
    const newAdmin = await admin.save();

    if (newAdmin) {
      return res.status(200).json({
        user: {
          user_id: newAdmin.id,
          email: newAdmin.email,
          emailConfirmed: newAdmin.emailConfirmed,
        },
        message: `Entrez le code reçu par email a l'adresse ${email} :`,
      });
    } else {
      res.status(400).json({
        user: { firstname: newUser.firstname },
        message: "Un probleme est survenue, veuillez réessayer.",
      });
    }
  }
});

// @route POST /api/admin/confirmed-code
// @description confirm admin email code
// @access Public
router.post("/confirmed-code", async (req, res) => {
  const { code, user } = req.body.data;

  const admin = await Admin.findOne({ _id: user.user_id });

  const isValidCode = admin.registeredConfirmedCode === Number(code);

  if (!admin) {
    return res.status(400).json({
      message: "Un probleme est survenue, veuillez réessayer.",
    });
  }
  if (!isValidCode) {
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
      },
      message: "Code incorrect veuillez réessayer.",
    });
  }

  if (isValidCode) {
    const updatedAdminUser = await Admin.findOneAndUpdate(
      { _id: user.user_id },
      { emailConfirmed: true },
      {
        new: true,
      }
    );
    if (updatedAdminUser) {
      return res.status(200).json({
        user: {
          id: updatedAdminUser._id,
          email: updatedAdminUser.email,
          emailConfirmed: updatedAdminUser.emailConfirmed,
        },
        message: "Indiquez un mot de passe.",
      });
    }
  } else {
    return res.status(400).json({
      message: "Un probleme est survenue, veuillez réessayer.",
    });
  }
});

// @route POST /api/admin/password
// @description handling admin password account
// @access Public
router.post("/password", async (req, res) => {
  const {
    user: { email },
    password,
  } = req.body.data;

  const adminUser = await Admin.findOne({ email });

  if (adminUser) {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const updatedAdminUser = await Admin.findOneAndUpdate(
        { email: adminUser.email },
        { password: hash, accountConfirmed: true },
        {
          new: true,
        }
      );

      if (!err && updatedAdminUser) {
        return res.status(200).json({
          user: {
            id: updatedAdminUser._id,
            email: updatedAdminUser.email,
            accountConfirmed: updatedAdminUser.accountConfirmed,
          },
          message: "Votre compte admin est actif",
        });
      } else {
        return res.status(400).json({
          message: "Un probleme est survenue, veuillez réessayer.",
        });
      }
    });
  } else {
    return res.status(400).json({
      message: "Un probleme est survenue, veuillez réessayer.",
    });
  }
});

module.exports = router;
