const sendEmail = require('../methods/_send-email');
const db        = require('../db');

module.exports = emailChatLink;

async function emailChatLink(req, res, next) {
  var uuids = req.body.uuids
    .split(',')
    .map(uuid => uuid.replace(/[^-\d\w]/ig, ''));

  let callFromUUID   = uuids.slice(-1)[0];
  let inCall         = await db.select('*').from('person').whereIn('uuid', uuids)
    .catch(err => console.log(err));
  let emailFrom      = inCall.filter(person => person.uuid === callFromUUID)[0];
  let emailTo        = inCall.filter(person => person.uuid !== callFromUUID);
  let emailAddresses = emailTo.map(person => person.email);
  let roomURL        = `${ process.env.ROOT_URL }/icy-ewe?room=${ encodeURIComponent(emailFrom.uuid) }`;

  console.log(`
    ${ emailFrom.name } (${ callFromUUID })
    sent email invites to:
    ${ emailTo.map(person => `${ person.email } (${ person.uuid })`).join('\n    ') }
  `);

  sendEmail({
    to      : emailAddresses,
    from    : emailFrom.email,
    subject : `Preco | Call invite from: ${ emailFrom.name }`,
    html    : `
      <div style="text-align: center; padding-top: 40px;">
        You have been invited to a call from:
        <br>

        <h2 style="word-break: break-all;">${ emailFrom.name }</h2>

        <a href="${ roomURL }">
          Click here to join the call
        </a>

        Or copy the following URL into your browser:
        <br>
        ${ roomURL }
      </div>
    `,
  });

  res.redirect(roomURL);

  next();
}
