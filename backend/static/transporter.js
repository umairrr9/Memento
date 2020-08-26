const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
async function getNodeMailer() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // CHANGE THIS TO SUIT YOUR EMAIL PROVIDER 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  return transporter;
}

async function sendEmail(to, subject, html) {
  const transporter = await getNodeMailer();
  transporter.sendMail(
    {
      to,
      subject,
      html,
    },
    err => {
      if (err) console.error(err);
    }
  );
}

module.exports = { sendEmail, getNodeMailer };
