const nodemailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendGrid({
    auth: {
      api_user: "node-demo",
      api_key: process.env.MAIL_API_KEY,
    },
  })
);

const sendMail = async (email) => {
  await transporter.sendMail({
    to: email,
    from: `Lazy Blog Org ${process.env.TRANS_FROM_EMAIL}`,
    subject: "Successfully regsitered",
    text:
      "Thank You! You have successfully registered to the laziest blog ever",
  });
};

module.exports = {
  sendMail,
};
