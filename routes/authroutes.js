const express = require('express');
const AuthController = require('../controller/authController'); // import  authController

const authrouter   = express.Router(); // get route object

authrouter.use('/register', AuthController.register);  // registration page view

authrouter.use('/user-register', AuthController.userRegister); // save registration 

authrouter.use('/login', AuthController.login);   // login page view 

authrouter.use('/doLogin', AuthController.doLogin);  // do login page view 

// GET /logout
authrouter.get('/logout', AuthController.logout);

authrouter.use('/dashboard', AuthController.dashboard);   // dashboard page view

authrouter.use('/', AuthController.home);  // home page view



module.exports = authrouter;

