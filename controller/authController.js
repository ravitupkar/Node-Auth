const mongoose = require('mongoose');
const uri = "mongodb+srv://ravitupkar01:ravitupkar01@cluster0ravi-flkid.mongodb.net/shop?retryWrites=true";
mongoose.connect(uri,  { useNewUrlParser: true }, function (err) {
    if (err) throw err;
//    console.log('Successfully connected');
});

const User  = require('../model/userModel'); // import user model 

module.exports.register = (req, res, next) => {
    res.render('register.ejs',{
        errorMessage : ''
    });
}

// User Register 
module.exports.userRegister = (req, res, next) => {
    // console.log(req.body);
    const userRegiter  = new User({
        _id: new mongoose.Types.ObjectId(),
        username : req.body.name,
        password : req.body.pwd,
        email : req.body.email,
        dob : req.body.dob,
        gender : req.body.gender,
        country : req.body.country,
        phone : req.body.phone
    });

    // console.log(userRegiter);
    userRegiter.save((err , result) => {
        if(err){
            console.log(err.message);
            res.render('register.ejs',{
                errorMessage : err.message
            });
        }else{
            console.log("saved sucssefully");
            res.redirect('/login');
        }

    });
}

// login page
module.exports.login = (req, res, next) => {
    console.log(req.session);
    res.render('login.ejs');
}

// do login
module.exports.doLogin = (req, res, next) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email , password : req.body.pwd }, function (err, user) {
        if(err){
            throw err;
        }else{
            console.log(user);
            req.session.userId = user._id;
            req.session.username = user.username;
            req.session.email = user.email;
            // console.log(req.session.userId);
            // console.log(username);
            console.log(req.session);
            res.redirect('/dashboard');
        }
    });
}

module.exports.logout = (req, res, next) => {
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
}

module.exports.dashboard = (req, res, next) => {
    console.log(req.session);
    res.render('dashboard.ejs', {
        username: req.session.username
    });
}

module.exports.home = (req, res, next) => {
    res.render('index.ejs');
}

