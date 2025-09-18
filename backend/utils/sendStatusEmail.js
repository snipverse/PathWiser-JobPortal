import nodemailer from "nodemailer";

export const sendStatusEmail = async (to, subject, text) => {
  // Configure your SMTP or use a service like Gmail, SendGrid, etc.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // set in .env
      pass: process.env.EMAIL_PASS, // set in .env
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
