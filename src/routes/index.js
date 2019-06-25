const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user');
const Service = require('../models/service')

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

router.get('/perfil', isAuthenticated, async(req, res, next) => {
    var pedidos = await Service.find({pedidoDe: {$ne: null}})
    res.render('perfil', {pedidos});
})

router.put('/perfil', isAuthenticated, async(req, res, next) => {
    var lat = req.body.lat;
    var long = req.body.long;

    User.findOneAndUpdate({username: req.user.username}, {lat: lat, long: long}, function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    res.render('perfil')
})

router.put('/perfil/eliminarPedido', isAuthenticated, async(req, res, next) => {
    var id = req.body.id;
    Service.findOneAndDelete({id: id},function(err,doc){
        if(err) return res.send(500, {error: err})
    })
    res.send('eliminado')
})

router.put('/perfil/aceptarPedido', isAuthenticated, async(req, res, next) => {
    var id = req.body.id;
    Service.findOneAndUpdate({id: id},{status: "aceptada"},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    await res.send('aceptado')
})

router.get('/pedidos', isAuthenticated, async(req, res, next) => {
    var pedidos = await Service.find({pedidoDe: {$ne: null}})
    res.render('pedidos', {pedidos});
})


router.get('/servicios', isAuthenticated, async(req, res, next) => {
    var pedidos = await Service.find({pedidoDe: {$ne: null}})
    res.render('servicios', {pedidos});
})

router.put('/servicios/cancelarServicio', isAuthenticated, async(req, res, next) => {
    var id = req.body.id;
    Service.findOneAndUpdate({id: id},{status: "cancelada"},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    await res.send('cancelado')
})

router.put('/servicios/terminarServicio', isAuthenticated, async(req, res, next) => {
    var id = req.body.id;
    Service.findOneAndUpdate({id: id},{status: "terminada"},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    await res.send('terminada')
})

router.put('/servicios/eliminarServicio', isAuthenticated, async(req, res, next) => {
    var id = req.body.id;
    Service.findOneAndDelete({id: id},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    await res.send('eliminado')
})

router.put('/mapa', isAuthenticated, async(req, res, next) => {

    var cliente = req.body.cliente;
    var tecnico = req.body.tecnico;
    var telefono = req.body.numero;

    console.log(cliente)
    const newService = new Service();
    newService.pedidoDe = cliente;
    newService.pedidoA = tecnico;
    newService.telefono = telefono;
    newService.status = "requested";
    newService.id = new Date().getTime()+cliente+tecnico;
    console.log(newService.id)
    await newService.save();

    res.send('enviado')
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

router.get('/setfoto', isAuthenticated, (req, res, next) => {
    res.render('setfoto')
})

router.post('/setfoto', isAuthenticated, async(req, res, next) => {
    var tecUrl = req.body.urlTec;
    console.log(tecUrl)
    User.findOneAndUpdate({username: req.user.username},{foto: tecUrl}, function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    await res.render('setfoto')
})

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('../login')
}



module.exports = router;