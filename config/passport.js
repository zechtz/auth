// app/setupPassport.js
var passport      =  require('passport');
var LocalStrategy =  require('passport-local').Strategy;
var models        =  require('../api/models/index');
var bcrypt        =  require('bcrypt-nodejs');

// Serialize sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.find({where: {id: id}}).success(function(user){
    done(null, user);
  }).error(function(err){
  done(err, null);
  });
});

/* middleware  */
passport.use(new LocalStrategy(function(req, email, passport, done){
  models.User.find({
      where:{
        email: email 
      }
  }) 
  .then(function(err, user){
    /* 
     there's an error trying to look for user 
     maybe database connection or something else 
     */
     if (err) return done(err);

     /* 
      we are able to access the database but the 
      user we're looking for is not in our database 
      */
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'User does not exist'));
      }

      /* 
       we found the user who wants to acces our system 
       but for some reason, password provided is wrong 
       */

       var hashedPassword = bcrypt.hashSync(password, user.salt)

       /* 
        all is well, we found the user and all the information 
        provided is correct 
        */
        if (user.password === hashedPassword) {
          return done(null, user);
        }

        /*
         Passwords do not match 
         */
         return done(null, false, { message: 'Incorrect credentials.' })
  });
}));
