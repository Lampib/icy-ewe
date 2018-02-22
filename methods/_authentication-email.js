let bcrypt       = require('bcrypt');
let secureRandom = require('secure-random');
const sendEmail  = require('../methods/_send-email');

module.exports = sendAuthenticationEmail;

async function sendAuthenticationEmail(email) {
  let authenticator = secureRandom.randomArray(16).map(byte => byte.toString(34)).join('');

  sendEmail({
    to      : email,
    subject : 'Preco -Please authenticate your email',
    html    : `
      Your authentication code is:
      <br>
      ${ authenticator }
      <br>
      <a href="${ process.env.ROOT_URL }/update-password?authenticator=${encodeURIComponent(authenticator) }&email=${ encodeURIComponent(email) }">
        Click here to authenticate
      </a>
    `,
  });

  return await bcrypt.hash(authenticator, 11)
                     .catch(err => console.log(err));
}
