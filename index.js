const express = require('express'); //include express
const path = require('path'); //include path
const bodyparser = require('body-parser'); //include body-parser
var session = require('express-session'); //include session
var MongoStore = require('connect-mongo')(session); //include 

const app = express();   //create express object

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge : 160000 }
}))

const authroutes = require('./routes/authroutes');  //import auth routes

app.set('views', path.join(__dirname, 'views')); // set view path

app.set('view engine', 'ejs');  // set view engine

app.use(bodyparser.urlencoded({extended :false})); // 

app.use(authroutes); // 


module.exports = app;

