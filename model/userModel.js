var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

  var usersSchema = new Schema({
    _id:  String,
    username: String,
    password: { 
        type: String , 
        required: [true,  'Password cannot be left blank']
    },
    email:    { 
        type: String,     
        Required:  'Email address cannot be left blank.',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        createIndexes: {unique: true, dropDups: true}
        },
    dob: { 
        type: String , 
        required: [true, 'Date of birth must be provided']
    },
    country: { 
        type: String , 
        required: [true, 'Country cannot be left blank.']
    },
    gender: { 
        type: String , 
        required: [true, 'Gender must be provided']},
    phone:   String,
    date: { type: Date, default: Date.now }
  });

  

var Users = mongoose.model('Users', usersSchema);
 
module.exports = Users;