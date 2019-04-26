const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/registrarse', (req, res, next) => {
    res.render('registrarse')
});

router.post('/registrarse', passport.authenticate('local-register', {
    successRedirect: '/perfil',
    failureRedirect: '/registrarse',
    passReqToCallback: true
}))

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    passReqToCallback: true
}))

router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/');
})

router.get('/perfil', isAuthenticated, (req, res, next) => {
    res.render('perfil');
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}

module.exports = router;