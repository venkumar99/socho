

import CONFIG from '../config/config';


var jwt = require('jsonwebtoken');
var _ = require("lodash");
//var users = require('./users');
import users from '../models/user';

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;



var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
//jwtOptions.secretOrKey = 'tasmanianDevil';
jwtOptions.secretOrKey = CONFIG.jwt_secret_key;


var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log('payload received', jwt_payload.id);
    // usually this would be a database call:
    users.findOne({id:jwt_payload.sub}, function(err, user) {
      if (err) {
        return done(err, false);
    }
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
  });
  });

passport.use(strategy);


exports.isAuthenticated = passport.authenticate('jwt', { session: false });