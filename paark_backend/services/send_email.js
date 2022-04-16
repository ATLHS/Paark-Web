const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  port: 587,
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.SMTP_USER_PASSWORD,
  },
  secure: false,
});

transporter.use(
  "compile",
  hbs({
    viewEngine: { encoding: "utf8", defaultLayout: false },
    viewPath: path.join(process.cwd() + "/views"),
    extName: ".hbs",
  })
);

module.exports = {
  sendAdminEmailNotification: async () => { 
    // const { firstname, phone, rides } = user;

    const mailData = {
      from: {
        name: "Paark",
        address: process.env.SMTP_USER_EMAIL,
      },
      to: "helloaplusk@live.fr",
      subject: "Nouvelle réservation Paark",
      template: "new_reservation",
      context: {
        firstname: "",
        phone: "",
        dropOffLocation: "rides[0].dropOffLocation",
        dropOffTime: "rides[0].dropOffTime",
      },
    };

    return transporter.sendMail(mailData);
  },
};
