"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClienteSchema = new mongoose_1.Schema({
    user: String,
    pass: String,
    nombre: String,
    apellido: String,
    telefono: Number,
    correo: String,
    dni: Number,
    direccion: String
});
exports.default = mongoose_1.model('Cliente', ClienteSchema);
