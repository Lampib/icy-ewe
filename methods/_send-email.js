// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sendEmail;

function sendEmail({ to, subject, html, from = 'brkjrdn@gmail.com' } = {}) {
  const msg = {
    to,
    subject,
    html,
    from,
  };
  sgMail.send(msg);
}
