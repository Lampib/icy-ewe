// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sendEmail;

function sendEmail({ to, subject, html, from = 'brkjrdn@gmail.com' } = {}) {
  const msg = {
    to,
    subject,
    from,
    html: `
      <table style="width: 100%; min-height: 100px; border-collapse: collapse; font-family: 'open sans', sans-serif; font-size: 16px; line-height: 24px;">
        <tr>
          <td></td>
          <td style="font-size: 30px; padding: 32px 40px; width: 500px;">
            <img
              alt="Preco"
              style="display: block; "
              height="32" width="131"
              src="https://preco.io/assets/images/preco.png"
              >
          </td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td style="padding: 32px 40px; padding-bottom: 160px;">
            ${ html }
          </td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td style="padding: 16px 40px; color: #aaa; font-size: 12px;">
            © Preco 2018
          </td>
          <td></td>
        </tr>
      </table>
    `,
  };
  sgMail.send(msg);
}
