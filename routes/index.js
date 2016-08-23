var express           =  require('express');
var passport          =  require('passport');
var router            =  express.Router();
var usersController   =  require('../api/controllers/users');
var homeController    =  require('../api/controllers/home');
var postsController   =  require('../api/controllers/posts');
var sessionController =  require('../api/controllers/session');

/* GET home page. */
router.get('/', homeController.index);

// users routes 
router.get('/signup',            usersController.new);
router.post('/signup',           usersController.create);
router.get('/users',             usersController.index);
router.get('/users/edit/:id',    usersController.edit);
router.post('/users/update/:id', usersController.update);

// users api routes 
router.put('/api/v1/users/update/:id', usersController.update);
router.post('/api/v1/signup',          usersController.create);

// sessions routes 
router.get('/login',           sessionController.new);
router.post('/session/create', sessionController.create);
router.get('/logout',         sessionController.destroy);

// posts routes 
router.get('/posts/new',         postsController.new);
router.post('/posts/create',     postsController.create);
router.get('/posts',             postsController.index);
router.get('/posts/:id',         postsController.show);
router.get('/posts/edit/:id',    postsController.edit);
router.post('/posts/update/:id', postsController.update);

// posts api routes 
router.get('/api/v1/posts/edit/:id',   postsController.edit);
router.put('/api/v1/posts/update/:id', postsController.update);
router.get('/api/v1/posts',            postsController.index);
router.get('/api/v1/posts/:id',        postsController.show);
router.post('/api/v1/posts/create',    postsController.create);

module.exports = router;
