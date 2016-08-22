var express         =  require('express');
var passport        =  require('passport');
var router          =  express.Router();
var usersController =  require('../api/controllers/users');
var homeController  =  require('../api/controllers/home');

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

module.exports = router;
