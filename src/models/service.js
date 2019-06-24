const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);

const serviceSchema = new Schema({
    pedidoDe: String,
    pedidoA: String,
    telefono: Number,
    status: String
})

module.exports = mongoose.model('services', serviceSchema)