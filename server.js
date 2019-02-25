import CONFIG from './config/config';
import  express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Agenda from 'agenda';
//IMPORT HELMET
import helmet from 'helmet'; //We are using Helmet for security
import csp from 'helmet-csp';
//IMPORT MIDDLEWARE
import passport from 'passport';
import session from 'express-session';
//IMPORT MONGOOSE
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
//store session in mongo
const MongoStore = connectMongo(session);

//IMPORT ALL THE MODELS
import models from './models'
import authController from './controller/authController';
import careNoteChatController from './controller/careNoteChatController';
import schedularController from './controller/schedularController';
import chatRoutes from './routes/chatroutes';


import routes from './routes/routes.js';

var port = CONFIG.port;
var port2 = CONFIG.port2;
var app = express();
//Add Cors for Cross Origin requests 
app.use(cors());

/*
app.use(csp({
  directives:{ defaultSrc: ["'self'"],
  scriptSrc:["'self'"],
  styleSrc:["'unsafe-inline'"],
  imgSrc: ["'self'"],
  connectSrc: ["'none'"],
  fontSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'none'"],
  frameSrc: ["'none'"]
}
}));

// Implement X-XSS-Protection
app.use(helmet.xssFilter());
// Hide X-Powered-By
app.use(helmet.hidePoweredBy());
*/


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
//Set Session touse Mongodb for storing session objects
const db = mongoose.connection
app.use(session( {
    secret: 'vens-secret',
    resave:false,
    saveUninitialized: false,
    cookie:{
       path:"/",
       maxAge: 1800000, // 30 min
    },
    store:new MongoStore({mongooseConnection:db}),
    name:"id",
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api',routes);
//console.log("routes", routes , "port", port)
app.listen(port);

//Setting up schedular
const agenda = new Agenda().mongo(db, 'carevenjobs');
agenda.start();
schedularController.schedule(agenda);



//Setting up socket
var server = require('http').Server(app);
var io = require('socket.io')(server);
console.log("port", port2)
server.listen(port2);

io.on('connection', function (socket) {
  chatRoutes(socket, io);
});



