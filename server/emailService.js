const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "thedevquest@hotmail.com",
    pass: "$hapS2503",
  },
});


transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Email service is ready to send messages");
  }
});

module.exports = transporter;