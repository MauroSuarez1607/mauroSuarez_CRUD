// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register, processRegister, login, processLogin, logout, profile, update} = require('../controllers/usersController');

/* /users */

router
    .get('/register', register)
    .post('/register', processRegister)
    .get('/login', login)
    .post('/login', processLogin)
    .get('/profile', profile)
    .put('/update', update)
    .get('/logout', logout)

module.exports = router;
