const AWS = require("aws-sdk");

const SES_CONFIG = {
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_KEY_ID,
  region: process.env.AWS_REGION,
};

const AWS_SES = new AWS.SES(SES_CONFIG);

const sendEmail = (firstname, email, message) => {
  let params = {
    Source: process.env.SMTP_USER_EMAIL,
    Destination: {
      ToAddresses: [process.env.SMTP_USER_EMAIL],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `De : ${email}

          <p>Prénom : ${firstname}<p/>
          
          <p>${message}<p/>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Paark - Nouveau message",
      },
    },
  };
  return AWS_SES.sendEmail(params).promise();
};

module.exports = {
  sendEmail,
};
