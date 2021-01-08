const nodemailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid-transport");

// const transporter = nodemailer.createTransport(
//   sendGrid({
//     auth: {
//       api_user: "node-demo",
//       api_key: process.env.MAIL_API_KEY,
//     },
//   })
// );

const transport = nodemailer.createTransport({
  auth: {
    user: process.env.TRANS_FROM_EMAIL,
    pass: process.env.TRANS_FROM_PASSWORD,
  },
});
const sendMail = async (email) => {
  let mailOptions = {
    from: process.env.TRANS_FROM_EMAIL,
    to: email,
    subject: "Welcome to lazyBlog",
    text: "Welcome to the worst blog in the entire world",
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log(`Email sent to ${email} + ${info}`);
      return true;
    }
  });
};

module.exports = {
  sendMail,
};
