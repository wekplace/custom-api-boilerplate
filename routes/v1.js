const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController 	= require('../controllers/home.controller');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post(    '/users',                                                       UserController.create);
router.get(     '/users',       passport.authenticate('jwt', {session: false}), UserController.get);
router.put(     '/users',       passport.authenticate('jwt', {session: false}), UserController.update);
router.delete(  '/users',       passport.authenticate('jwt', {session: false}), UserController.remove);
router.post(    '/users/login',                                                 UserController.login);

router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);
router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  

router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     
router.put(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.update);  
router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard);


module.exports = router;