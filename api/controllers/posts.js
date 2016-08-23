var models         =  require('../models/index');

// GET all posts  
module.exports.index = function(req, res){
  models.Post.findAll({})
  .then(function(posts){
    res.json(posts);
  });
};

// GET single post 
module.exports.show  = function(req, res){
  models.Post.find({
      where:{
        id: req.params.id
      }
  }).
  then(function(post){
    if (post) {
      res.status(200).json({success: true, data: post});
    } else {
      res.status(404).json({success: false, data: `post with id: ${req.params.id} not found`});
    }
  });
};

// New function renders the new post form 
module.exports.new =  function(req, res){
  var user_id      =  req.user.id;
  res.render('posts/new');
};

// Create function creates & saves the post 
module.exports.create =  function(req, res){

  var user_id         =  req.user.id;

  var title           =  req.body.title;
  var content         =  req.body.content;

  models.Post.create({
      title   : title,
      UserId  : user_id,
      content : content
  })
  .then(function(post){
    if (req.method === "POST"){
      res.redirect('/');
    } else {
      res.json(post);
    }
  });
};

// Edit post renders the edit post form 
module.exports.edit = function(req, res){
  models.Post.find({
      where: {
        id: req.params.id 
      }
  })
  .then(function(post){
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
            UserId  : req.body.UserId,
            content : req.body.content
        })
        .then(function(post){
          if (req.method === "PUT"){
            res.json(post);
          } else {
            res.redirect('/');
          }
        })
      }
    });
};
