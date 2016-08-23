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
  res.render('posts/new');
};

// Create function creates & saves the post 
module.exports.create =  function(req, res){

  var title           =  req.body.title;
  var UserId          =  req.body.UserId;
  var content         =  req.body.content;

  models.Post.create({
      title   : title,
      UserId  : UserId,
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
            UserId  : req.body.UserId,
            content : req.body.content
        })
        .then(function(post){
          res.json(post);
        })
      }
    });
};
