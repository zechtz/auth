var models         =  require('../models/index');

// GET all users 
module.exports.index = function(req, res){
  models.Post.findAll({})
  .then(function(posts){
    res.json(posts);
  });
};

// New function renders the new post form 
module.exports.new =  function(req, res){
  res.render('posts/new');
};

// Create function creates & saves the post 
module.exports.create =  function(req, res){

  var title           =  req.body.title;
  var user_id         =  req.body.user_id;
  var content         =  req.body.content;

  models.Post.create({
      title   : title,
      user_id : user_id,
      content : content
  }).then(function(post){
  res.json(post);
  });
};

// Edit post renders the edit post form 
module.exports.edit = function(req, res){
  models.Post.find({ id : req.params.id }, function (err, post){
    if(err) return err;
    res.render('posts/edit', {
        post  : post,
        title : "Edit"
    });
  });
};

//update post updates posts attributes and save to database
module.exports.update = function(req, res){
  models.Post.find({
      where: {
        id: req.params.id 
      }
  })
  .then(function(post){
    if (post){
      post.updateAttributes({
          title   : req.body.title,
          user_id : req.body.user_id,
          content : req.body.content
      })
      .then(function(post){
        res.json(post);
      })
    }
  });
};
