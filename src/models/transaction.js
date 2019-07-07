const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);

const transactionSchema = new Schema({
    paypalID: String,
    servicioID: String
})

module.exports = mongoose.model('transactions', transactionSchema)