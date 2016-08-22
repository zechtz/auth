var models         =  require('../models/index');
var bcrypt         =  require('bcrypt-nodejs');

// GET all users 
module.exports.index = function(req, res){
  models.User.findAll({})
  .then(function(users){
    res.json(users);
  });
};

module.exports.new =  function(req, res){
  res.render('users/new');
};

module.exports.create =  function(req, res){

  var password        =  req.body.password;
  var password2       =  req.body.salt;
  var username        =  req.body.username;
  var email           =  req.body.email;
  var firstname       =  req.body.first_name;
  var lastname        =  req.body.last_name;

  /* 
   passwords should never be saved as plain texts, so we need 
   to hash them 
   */
   var salt           =  bcrypt.genSaltSync(10)
   var hashedPassword =  bcrypt.hashSync(password, salt)

   /* 
    if the password confirmation field doesn't match 
    the password field the there's an error 
    */
    if(password !== password2){
      req.flash('error', 'Please enter the same password twice');
      res.redirect('/signup');
    }

    /* 
     some fields should never be left blank so an error should be reised when they are left blank 
     */
     if (!email || !password || !password2 || !username) {
       req.flash('error', "Please, fill in all the fields.")
       res.redirect('signup')
     }

     /* 
      all is well so we go ahead and create our user 
      */
      models.User.create({
          email      : email,
          username   : username,
          password   : hashedPassword,
          salt       : hashedPassword,
          first_name : firstname,
          last_name  : lastname
      }).then(function(user){
      res.json(user);
      });
};

// edit user profile 
module.exports.edit = function(req, res){
  models.User.find({ id : req.params.user_id }, function (err, user){
    if(err) return err;
    res.render('events/edit', {
        user  : user,
        title : "Edit"
    });
  });
};

//update user profile 
module.exports.update = function(req, res){
  models.User.find({
      where: {
        id: req.params.id 
      }
  })
  .then(function(user){
    if (user){
      user.updateAttributes({
          email      :  req.body.email, 
          first_name :  req.body.first_name, 
          last_name  :  req.body.last_name
      })
      .then(function(user){
        res.json(user);
      })
    }
  });
};
