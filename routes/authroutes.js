const express = require('express');

const AuthController = require('../controller/authController'); // import  authController

const authrouter   = express.Router(); // get route object

authrouter.use(AuthController.getUser);

authrouter.use('/register', AuthController.redirectToDashbodrd, AuthController.register);  // registration page view

authrouter.use('/user-register', AuthController.userRegister); // save registration 

authrouter.use('/login', AuthController.redirectToDashbodrd, AuthController.login);   // login page view 

authrouter.use('/doLogin', AuthController.doLogin);  // do login page view 

authrouter.get('/logout', AuthController.logout); // home

authrouter.use('/dashboard', AuthController.redirectToLogin, AuthController.dashboard);   // dashboard page view

authrouter.use('/profile', AuthController.redirectToLogin, AuthController.profile);   // profile page view

authrouter.use('/profile-edit', AuthController.redirectToLogin, AuthController.profileEdit);   // profile page view

authrouter.use('/profile-update', AuthController.redirectToLogin, AuthController.profileUpdate);   // profile page view

authrouter.get('/change-password', AuthController.redirectToLogin, AuthController.changePassword);   // profile page view

authrouter.post('/change-password', AuthController.redirectToLogin, AuthController.updatePassword);   // profile page view

authrouter.get('/', AuthController.home);



module.exports = authrouter;

