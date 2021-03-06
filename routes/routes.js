import express,{Router} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt';
import userController from '../controller/userController';

import authController from '../controller/authController';
import medicationController from '../controller/medicationController';
import insuranceController from '../controller/insuranceController';
import careNoteController from '../controller/careNoteController';

import userHealthProfileController from '../controller/userHealthProfileController';

import addUserController from '../controller/addUserController';
import consentController from '../controller/consentController';
import schedularController from '../controller/schedularController';
import emailController from '../controller/emailController'

import policyController from '../controller/policyController';

import dailyVaitalsController from '../controller/dailyVitalsController';
import getDailyVitalsController from '../controller/getDailyVitalsController';

import chartsController from '../controller/chartsController';

var routes = express.Router();


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
//routes.post('/medication',authController.isAuthenticated,medicationController.addMedication);
//routes.get('/medication/:RxNum', authController.isAuthenticated,medicationController.getMedicationByRxNum);
//routes.get('/medication/:RxNum', authController.isAuthenticated,medicationController.getMedicationByRxNum);

//routes for Insurance
routes.post('/insurance', authController.isAuthenticated,insuranceController.addInsurance);
routes.get('/insurance',authController.isAuthenticated,insuranceController.getInsuranceList);
routes.get('/insurance/:IDNum', authController.isAuthenticated,insuranceController.getInsuranceByID);
//routes.get('/insurance/:user_id',authController.isAuthenticated,insuranceController.getInsuranceForUser);

//Routes for Care Notes
//routes.post('/careNote',authController.isAuthenticated, careNoteController.addNote);
routes.get('/getCareNoteList', careNoteController.getCareNotes);
routes.post('/addCareNote', careNoteController.addCareNote);

//Routes for add new user
routes.post('/addUser', addUserController.addUser);
routes.get('/conformation/:token', emailController.validateEmail);
routes.get('/conformation/:token/:response', addUserController.emailResponse);
routes.post('/account', addUserController.getAccountDetail);
routes.get('/accountList', addUserController.getApprovedAccounts);


routes.get('/graphs/:chartName', chartsController.graphs);


//Routes for consent
routes.get('/consent', consentController.getConsentList);
routes.post('/updateConsent', consentController.updateConsent);

//Routes for medication
routes.get('/medication', medicationController.getMedicationForUser);
routes.post('/addMedication', medicationController.addMedication);

//Routes for schedular
routes.get('/getMedicationSchedule', schedularController.getTodaySchedule);

//Routes for term of service pdf
routes.get('/termOfService', policyController.getTermOfService);

//Routes for daily vitals
routes.post('/bath', dailyVaitalsController.addBath);
routes.post('/fall', dailyVaitalsController.addFall);
routes.post('/bloodPressure', dailyVaitalsController.addBloodPressure);
routes.post('/mood', dailyVaitalsController.addMood);
routes.post('/nutrition', dailyVaitalsController.addNutrition);
routes.post('/otherVitals', dailyVaitalsController.addOtherVitals);
routes.post('/bowell', dailyVaitalsController.addBowell);
routes.post('/cognitiveCare', dailyVaitalsController.addCognitiveCare);
routes.post('/diabetic', dailyVaitalsController.addDiabetic);
routes.post('/hygiene', dailyVaitalsController.addHygiene);
routes.post('/pain', dailyVaitalsController.addPain);
routes.post('/sleep', dailyVaitalsController.addSleep);

routes.get('/getDailyVital', getDailyVitalsController.getLastUpdate);

module.exports = routes;
