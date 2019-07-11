const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    lastname: String,
    phone: String,
    dni: String,
    direccion: String,
    esTecnico: String,
    especialidad: String,
    lat: Number,
    long: Number,
    foto: String,
    amount: Number,
    numPedidos: Number,
    valoracion: Number
})

userSchema.methods.hashear = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.compararPW = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users', userSchema)