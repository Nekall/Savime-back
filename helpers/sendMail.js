import nodemailer from "nodemailer";
const { SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_SENDERMAIL } = process.env;

export const sendMail = (to, subject, htmlContent) => {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });
  let mailOptions = {
    from: SMTP_SENDERMAIL,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions);
};