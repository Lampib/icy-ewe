module.exports = renderChat;

function renderChat(req, res, next) {
  res
    .status(200)
    .render('chat', res.locals.hbs);
  //next();
}
