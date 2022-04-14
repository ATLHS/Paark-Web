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

sendAdminEmailNotification = () => {
  // const { firstname, phone, rides } = user;

  const mailData = {
    from: {
      name: "Paark",
      address: process.env.SMTP_USER_EMAIL,
    },
    to: process.env.RECIPIENTS_SMTP_USER_EMAIL,
    subject: "Nouvelle réseravtion Paark",
    template: "new_reservation",
    context: {
      firstname: "Bob",
      phone: "0092727733",
      dropOffLocation: "address ",
      dropOffTime: "hours ",
    },
  };

  return transporter.sendMail(mailData);
};

sendAdminEmailNotification();
// };
