const db = require('../database/models')

module.exports = {
    register : (req,res) => {
        return res.render('userRegister')
    },
    processRegister : (req,res) => {
        const {name, surname, email, password} = req.body

        db.User.create({
            name,
            surname,
            email,
            password
        })
            .then(user => {
                return res.redirect('/users/login')
            })
            .catch(error => console.log(error))
    },
    login : (req,res) => {
        return res.render('userLogin')
    },
    processLogin : (req,res) => {

    },
    profile : (req,res) => {

    },
    update : (req,res) => {

    },
    logout : (req,res) => {

    }
}