let bcrypt       = require('bcrypt');
let secureRandom = require('secure-random');
const sendEmail  = require('../methods/_send-email');

module.exports = sendAuthenticationEmail;

async function sendAuthenticationEmail(email) {
  let authenticator = secureRandom.randomArray(16).map(byte => byte.toString(34)).join('');

  sendEmail({
    to      : email,
    subject : 'Preco | Please authenticate your email',
    html    : `
      <div style="text-align: center; padding-top: 40px;">
        Your authentication code is:
        <br>

        <h2 style="word-break: break-all;">${ authenticator }</h2>

        <a href="${ process.env.ROOT_URL }/update-password?authenticator=${encodeURIComponent(authenticator) }&email=${ encodeURIComponent(email) }">
          Click here to authenticate
        </a>
      </div>
    `,
  });

  return await bcrypt.hash(authenticator, 11)
                     .catch(err => console.log(err));
}
