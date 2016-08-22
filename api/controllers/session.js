var passport       =  require('passport');

/* GET login page. */
module.exports.new = function(req, res) {
  if (req.user){
    req.flash('info', "You are already logged in");
    return res.redirect('/');
  } 
  res.render('sessions/new', { 
      title : 'Login'
  });
};

module.exports.crete = function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
    if (err) return next(err);
    if (!user) return res.redirect('/login');
    req.login(user, function(err){
      if (err) return next(err);
      req.flash('success', "Successfully logged in!");
      return res.redirect('/');
    });
  })(req, res, next)
};

module.exports.destroy = function(req, res){
  req.logout();
  res.redirect('/');
  req.session.destroy();
};

