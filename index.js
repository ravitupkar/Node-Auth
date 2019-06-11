const express = require('express'); //include express
const path = require('path'); //include path
const bodyparser = require('body-parser'); //include body-parser
var session = require('express-session'); //include session
const fileUpload = require('express-fileupload');
var MongoStore = require('connect-mongo')(session); //include 
var flash = require('connect-flash');
var back = require('express-back');

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const app = express();   //create express object

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(back());
  app.use(flash());


app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!')
  console.log('Flash is back!')
  return res.back();
});

const authroutes = require('./routes/authroutes');  //import auth routes
const productroutes = require('./routes/productroutes');  //import auth routes

const personstoryroutes = require('./routes/personstoryRoutes');  //import auth routes

app.set('views', path.join(__dirname, 'views')); // set view path

app.set('view engine', 'ejs');  // set view engine
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(bodyparser.urlencoded({extended :true})); // 

app.use(authroutes); // 

app.use(productroutes); //

app.use(personstoryroutes); //

module.exports = app;

