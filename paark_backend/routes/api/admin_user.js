const router = require("express").Router();
const Admin = require("../../models/admin");
const randomNumber = require("../../utils/randomDigitNumber.js");
// const sendEmail = require("../../services/send_email");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const registeredConfirmedCode = randomNumber.randomFourDigitNumber();

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

  if (adminExist) {
    if (!adminExist.isConfirmed) {
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
                  isConfirmed: updatedAdminUser.isConfirmed,
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
    if (adminExist.isConfirmed) {
      res.status(200).json({
        user: {
          user_id: adminExist._id,
          email: adminExist.email,
          isConfirmed: adminExist.isConfirmed,
        },
        message: "Indiquez un mot de passe.",
      });
    }
  } else {
    const admin = new Admin({
      email,
      isConfirmed: false,
      registeredConfirmedCode,
    });
    const newAdmin = await admin.save();

    if (newAdmin) {
      return res.status(200).json({
        user: {
          user_id: newAdmin.id,
          email: newAdmin.email,
          isConfirmed: newAdmin.isConfirmed,
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
      user: { id: user._id, email: user.email, isConfirmed: user.isConfirmed },
      message: "Code incorrect veuillez réessayer.",
    });
  }

  if (isValidCode) {
    const updatedAdminUser = await Admin.findOneAndUpdate(
      { _id: user.user_id },
      { isConfirmed: true },
      {
        new: true,
      }
    );
    if (updatedAdminUser) {
      return res.status(200).json({
        user: {
          id: updatedAdminUser._id,
          email: updatedAdminUser.email,
          isConfirmed: updatedAdminUser.isConfirmed,
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
  // const { code, user } = req.body.data;
  console.log(req.body.data);
});

module.exports = router;
