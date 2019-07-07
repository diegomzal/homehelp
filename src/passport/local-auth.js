const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const user = await User.findOne({ username: username });
    if (user) {
        return done(null, false, req.flash('registerMessage', 'El usuario ya está registrado'));
    } else {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return done(null, false, req.flash('registerMessage', 'El correo ya está registrado'));
        } else {
            console.log(req.body)
            const newUser = new User();
            newUser.username = username;
            newUser.password = newUser.hashear(password);
            newUser.email = req.body.email;
            newUser.name = req.body.name;
            newUser.lastname = req.body.lastname;
            newUser.phone = req.body.phone;
            newUser.dni = req.body.dni;
            newUser.direccion = req.body.direccion;
            newUser.esTecnico = req.body.esTecnico;
            newUser.especialidad = req.body.especialidad;
            newUser.numPedidos = 0;
            newUser.valoracion = 0;
            await newUser.save();
            done(null, newUser);
        }
    }


}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const user = await User.findOne({ username: username });
    if (!user) {
        return done(null, false, req.flash('loginMessage', 'Usuario o contraseña incorrectos'))
    }
    if (!user.compararPW(password)) {
        return done(null, false, req.flash('loginMessage', 'Usuario o contraseña incorrectos'))
    }
    done(null, user);

}))