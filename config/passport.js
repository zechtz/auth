// app/setupPassport.js
var passport      =  require('passport');
var LocalStrategy =  require('passport-local').Strategy;
var Model         =  require('../api/models/index');
var bcrypt        =  require('bcrypt-nodejs');

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Model.User.find({
      where: {id: id}
  }).then(function(user){
    done(null, user);
  }).error(function(err){
  done(err, null);
  });
});

/* middleware  */
passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
}, function(req, email, password, done) {
    Model.User.findOne({
      where: {
        'email': email 
      }
    }).then(function (user) {
      if (user == null) {
        return done(null, false, req.flash('message', 'No user found'));
      }
        
      var hashedPassword = bcrypt.hashSync(password, user.salt);
        
      if (user.password === hashedPassword) {
        return done(null, user);
      }
        
      return done(null, false, req.flash('message', 'Incorrect credentials'));
    });
  }
));
