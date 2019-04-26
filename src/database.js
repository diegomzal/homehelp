const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI, {useNewUrlParser: true})
    .then(db => console.log('Conexión a DB exitosa'))
    .catch(err => console.error(err));