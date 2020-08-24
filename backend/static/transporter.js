const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
async function getNodeMailer() {
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: testAccount.user, // generated ethereal user
    //   pass: testAccount.pass, // generated ethereal password
    // },
    service: "gmail",
    auth: {
      user: "mementonotes@gmail.com",
      pass: "SmileBoxQuad8",
    },
  });

  return transporter;
}

async function sendEmail(to, subject, html) {
  const transporter = await getNodeMailer();
  console.log(transporter);
  transporter.sendMail(
    {
      to,
      subject,
      html,
    },
    (err, info) => {
      if (err) console.error(err);
      console.log(info);
    }
  );
}

module.exports = { sendEmail, getNodeMailer };
