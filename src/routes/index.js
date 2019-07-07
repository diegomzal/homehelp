const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user');
const Service = require('../models/service');
const Transaction = require('../models/transaction')
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const payPalClient = require('../paypal');

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
    var monto = req.body.monto;

    User.findOneAndUpdate({username: req.user.username}, {lat: lat, long: long, amount: monto}, function(err, doc){
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

router.put('/pedidos/valorarPedido', isAuthenticated, async(req,res,next)=>{
    var username = req.body.tecnico;
    var valoracion = req.body.valoracion;
    var valoracionActual = 0;
    var pedidoActual = 0;
    User.findOne({username: username}, function(err, doc){
        if(err) throw err;
        valoracionActual = doc.valoracion;
        pedidoActual = doc.numPedidos;
        console.log("ValoracionActual: "+ valoracionActual)
        console.log("pedidoActual: "+ pedidoActual)
        valoracionActual = valoracionActual * pedidoActual
        pedidoActual = pedidoActual + 1
        console.log("----")
        console.log("ValoracionActual: "+ valoracionActual)
        console.log("pedidoActual: "+ pedidoActual)
        valoracionActual = (parseFloat(valoracionActual) + parseFloat(valoracion)) / pedidoActual
        console.log("----")
        console.log("ValoracionActual: "+ valoracionActual)
        User.findOneAndUpdate({username: username},{numPedidos: pedidoActual, valoracion: valoracionActual}, function(err, doc){
            if(err) return res.send(500, {error: err});
        })
    });
    var id = req.body.id;
    Service.findOneAndUpdate({id: id},{status: "valorada"},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    
    await res.send('Enviado')
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

router.put('/servicios/facturarServicio', isAuthenticated, (req, res, next) => {
    var id = req.body.id;
    var monto = req.body.monto;
    Service.findOneAndUpdate({id: id},{status: "terminada", amount: monto},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    res.send('facturado')
})

router.put('/servicios/eliminarServicio', isAuthenticated, async(req, res, next) => {
    var id = req.body.id;
    Service.findOneAndDelete({id: id},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    await res.send('eliminado')
})

router.post('/paypal-transaction-complete', isAuthenticated, async(req, res, next) => {
    const orderID = req.body.orderID;
    const pedidoID = req.body.pedidoID;
    console.log(orderID)
    console.log(pedidoID)
    let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);
    let order;
    try {
        order = await payPalClient.client().execute(request);
    } catch (err) {
        console.error(err);
        return res.send(500);
    }
    Service.findOneAndUpdate({id: pedidoID},{status: "pagada"},function(err, doc){
        if(err) return res.send(500, {error: err});
    })
    const newTransaction = new Transaction();
    newTransaction.paypalID = orderID;
    newTransaction.servicioID = pedidoID;
    newTransaction.save();

    res.send(200);
})

router.put('/mapa', isAuthenticated, async(req, res, next) => {

    var cliente = req.body.cliente;
    var tecnico = req.body.tecnico;
    var telefono = req.body.numero;
    var amount = req.body.amount;

    console.log(cliente)
    const newService = new Service();
    newService.pedidoDe = cliente;
    newService.pedidoA = tecnico;
    newService.telefono = telefono;
    newService.status = "requested";
    newService.amount = amount;
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