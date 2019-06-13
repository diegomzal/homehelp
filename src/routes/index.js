const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user')

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

router.get('/google', passport.authenticate('google-register', {
    scope: ['profile', 'email']
}))

//Callback para redirigir auth de google
router.get('/google/redirect', passport.authenticate('google-register', {
    successRedirect: '/perfil',
    failureRedirect: '/login'
}))

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

router.put('/perfil', async(req, res, next) => {
    var lat = req.body.lat;
    var long = req.body.long;

    User.findOneAndUpdate({username: req.user.username}, {lat: lat, long: long}, function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    res.render('perfil')
})

router.get('/mapa', isAuthenticated, async(req, res, next) => {
    var localizables = await User.find({lat: {$ne: null}})
    res.render('mapa', {localizables});
})

router.get('/tecnicos', isAuthenticated, async(req, res, next) => {
    var tecnicos = await User.find({esTecnico: "on"})
    res.render('tecnicos', {tecnicos})
})

router.get('/clientes', isAuthenticated, async(req, res, next) => {
    var clientes = await User.find({esTecnico: null})
    res.render('clientes', {clientes})
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}



module.exports = router;