const mongoose = require('mongoose');
const uri = "mongodb+srv://ravitupkar01:ravitupkar01@cluster0ravi-flkid.mongodb.net/shop?retryWrites=true";
mongoose.connect(uri,  { useNewUrlParser: true }, function (err) {
    if (err) throw err;
//    console.log('Successfully connected');
});

const User  = require('../model/userModel'); // import user model 


module.exports.redirectToLogin = (req, res, next) =>{
    if(!req.session.UserId){
        res.redirect('/login');
    }else{
        next();
    }
}

module.exports.isLogin = (req, res, next) =>{
    if(!req.session.UserId){
        return false;
    }else{
        return true;
    }
}

module.exports.redirectToDashbodrd = (req, res, next) =>{
    if(req.session.UserId){
        res.redirect('/dashboard');
    }else{
        next();
    }
}

module.exports.getUser = (req, res, next) =>{
    // const { UserId } = req.session; 
    // if(UserId){
    //      res.locals.user = User.find(
    //         user => user._id === UserId
    //     );
    // }

        next();
    
}


module.exports.register = (req, res, next) => {
    let { UserId, Username } = req.session;
    res.render('register.ejs', {
        UserId: UserId,
        Username: Username,
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
    userRegiter.save((err , user) => {
        if(err){
            console.log(err.message);
            res.render('register.ejs',{
                errorMessage : err.message
            });
        }else{
            console.log("saved sucssefully");
            req.session.UserId = user._id;
            req.session.Username = user.username;
            res.redirect('/login');
        }

    });
}

// login page
module.exports.login = (req, res, next) => {
    let { UserId, Username } = req.session;
    res.render('login.ejs', {
        UserId: UserId,
        Username: Username,
    });;
}

// do login
module.exports.doLogin = (req, res, next) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email , password : req.body.pwd }, function (err, user) {
        if(err){
            throw err;
        }else{
            // console.log(user);
            req.session.UserId = user._id;
            req.session.Username = user.username;
            // console.log(req.session);
            // console.log('dashboard');
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
    let { UserId, Username } = req.session;
    // console.log(UserId);
    // console.log(Username);
    res.render('dashboard.ejs', {
        UserId: UserId,
        Username: Username,
    });
}

module.exports.profile = (req, res, next) => {
    let { UserId, Username } = req.session;
    // let { user } = res.locals;
    User.findOne({ _id : UserId}, function (err, user) {
        if(err){

        }else{
            // console.log(user);
            res.render('profile.ejs', {
                UserId: UserId,
                Username: Username,
                User : user
            });
        }

    });
    
    // console.log(Username);
    
}

module.exports.profile = (req, res, next) => {
    let { UserId, Username } = req.session;
    // let { user } = res.locals;
    User.findOne({ _id : UserId}, function (err, user) {
        if(err){

        }else{
            // console.log(user);
            res.render('profile.ejs', {
                UserId: UserId,
                Username: Username,
                User : user
            });
        }

    });
    
    // console.log(Username);
    
}


module.exports.profileEdit = (req, res, next) => {
    let { UserId, Username } = req.session;
    // let { user } = res.locals;
    User.findOne({ _id : UserId}, function (err, user) {
        if(err){

        }else{
            // console.log(user);
            res.render('profile-edit.ejs', {
                UserId: UserId,
                Username: Username,
                User : user
            });
        }

    });
    
    // console.log(Username);
    
}

module.exports.profileUpdate = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(req.body);
    let { user } = res.locals;
    User.findOneAndUpdate({ _id : UserId}, 
        { $set: 
            { 
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                country: req.body.country
            }
        }, function (err, user) {
        if(err){

        }else{
            console.log("user update successfully");
            res.redirect('/profile');
        }

    });
    
}

module.exports.changePassword = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(UserId);
    // console.log(Username);
    res.render('change-password.ejs', {
        UserId: UserId,
        Username: Username,
    });
}

module.exports.updatePassword = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(req.body);
    // console.log(UserId);
    // console.log(Username);
    User.findOneAndUpdate({ _id : UserId,  password : req.body.old_password}, 
        { $set: 
            { 
                password : req.body.password
            }
        }, function (err, user) {
        if(err){

        }else{
            console.log("Password update successfully");
            res.redirect('/profile');
        }

    });
}


module.exports.saveImage = (req, res, next) => {
    res.render('file-upload.ejs');
}

module.exports.home = (req, res, next) => {
    let { UserId, Username } = req.session;
    // console.log(UserId);
    // console.log(Username);
    res.render('index.ejs', {
        UserId: UserId,
        Username: Username,
    });
}






