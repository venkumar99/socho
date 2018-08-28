import express,{Router} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import userController from '../controller/userController';
import beerController from '../controller/beerController';
import authController from '../controller/authController';
import medicationController from '../controller/medicationController';
import insuranceController from '../controller/insuranceController';
import careNoteController from '../controller/careNoteController';

import userHealthProfileController from '../controller/userHealthProfileController';


var routes = express.Router();


routes.post('/beers',authController.isAuthenticated,beerController.addBeer);
routes.get('/beers/',authController.isAuthenticated, beerController.list);
routes.get('/beers/:beer_id',authController.isAuthenticated, beerController.getBeerById);
routes.put('/beers/:beer_id',authController.isAuthenticated, beerController.updateBeer);

//Route to login
routes.post('/users/login', userController.login);
/*
routes.post('/users/login', function(req,res) {
   //let reqBody=req.body;
   console.log({"request":req.body.user_id});
   userController.login; });
*/

//Routes for Users
routes.post('/users',userController.register);
//routes.get('/users',authController.isAuthenticated,userController.test);

  
routes.get("/users", authController.isAuthenticated, userController.getUsers);

  routes.get("/secret", authController.isAuthenticated, function(req, res){
    res.json({message: "Success! You can not see this without a token"});
  });

//routes.get('/users',userController.getUsers);
routes.get('/users/:user_id',authController.isAuthenticated,userController.getUserById);

//Routes for UserHealthInfo
routes.post('/userHealth',authController.isAuthenticated, userHealthProfileController.addHealthInfo);
routes.put('/userHealth/:userid',authController.isAuthenticated, userHealthProfileController.updateHealthInfo);

routes.get('/userHealth/:userid',authController.isAuthenticated, userHealthProfileController.getHealthInfoForUser);


//Routes for Medications
//routes.post('/medication', authController.isAuthenticated,medicationController.addMedication);
routes.post('/medication',authController.isAuthenticated,medicationController.addMedication);
routes.get('/medication/:RxNum', authController.isAuthenticated,medicationController.getMedicationByRxNum);
//routes.get('/medication/:RxNum', authController.isAuthenticated,medicationController.getMedicationByRxNum);

//routes for Insurance
routes.post('/insurance', authController.isAuthenticated,insuranceController.addInsurance);
routes.get('/insurance',authController.isAuthenticated,insuranceController.getInsuranceList);
routes.get('/insurance/:IDNum', authController.isAuthenticated,insuranceController.getInsuranceByID);
//routes.get('/insurance/:user_id',authController.isAuthenticated,insuranceController.getInsuranceForUser);

//Routes for Care Notes
routes.post('/careNote',authController.isAuthenticated, careNoteController.addNote);


module.exports = routes;