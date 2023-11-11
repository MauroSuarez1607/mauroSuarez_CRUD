// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register, processRegister, login, processLogin, logout, profile, update} = require('../controllers/usersController');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const checkUserLogin = require('../middlewares/checkUserLogin');


/* /users */

router
    .get('/register', register)
    .post('/register',registerValidator, processRegister)
    .get('/login', login)
    .post('/login',loginValidator , processLogin)
    .get('/profile', checkUserLogin, profile)
    .put('/update', update)
    .get('/logout', logout)

module.exports = router;
