const nodemailer = require("nodemailer");

const sendForgotPasswordEmail = async ({ resetpasswordtoken, email }) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e87458e8866cfb",
      pass: "5b645eda1c348b",
    },
  });

  const info = await transport.sendMail({
    from: '"MarketPlace" <market.place@domain.com>', // sender address
    to: `${email}, ${email}`, // list of receivers
    subject: "Reset password requested", // Subject line
    text: `Your email code is : ${resetpasswordtoken}`,
    // plain text body
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = {
  sendForgotPasswordEmail,
};
