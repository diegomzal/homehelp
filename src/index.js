const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//inicialización
const app = express();
require('./database');
require('./passport/local-auth');
require('./passport/google-auth');


//Configuración
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000)


//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'secretHHDMZ',
    resave: false,
    saveUninitialized: false
}))
app.use(express.static(path.join(__dirname, '/public')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.registerMessage = req.flash('registerMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    app.locals.user = req.user;
    next();
})

// Rutas
app.use('/', require('./routes/index'))

//Empezar SV
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})