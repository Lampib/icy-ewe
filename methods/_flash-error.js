module.exports = function(req, err) {
  console.log(err);
  req.flash('error', `${ err }`);
}
