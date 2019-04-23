"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TecnicoSchema = new mongoose_1.Schema({
    user: String,
    pass: String,
    nombre: String,
    apellido: String,
    telefono: Number,
    correo: String,
    dni: Number,
    direccion: String,
    especialidad: String
});
exports.default = mongoose_1.model('Tecnico', TecnicoSchema);
