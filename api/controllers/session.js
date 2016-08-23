var passport       =  require('passport');

/* GET login page. */
module.exports.new = function(req, res) {
  if (req.user){
    req.flash('info', "You are already logged in");
    return res.redirect('/');
  } 
  res.render('session/new', { 
      title : 'Login'
  });
};

/* log the user in  */
module.exports.create = function(req, res, next){
  passport.authenticate('local', function(err, user){
    if (err) return next(err);
    if (!user) return res.redirect('/login');

    req.login(user, function(err){
      if (err) return next(err);
      req.flash('success', "Successfully logged in");
      return res.redirect("/");
    });
  })(req, res, next);
};

module.exports.destroy = function(req, res){
  req.logout();
  res.redirect('/');
  console.log('logged out');
  req.session.destroy();
};

