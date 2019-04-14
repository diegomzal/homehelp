import mongoose, { Schema, model } from 'mongoose';

export interface Cliente extends mongoose.Document {
    user: String;
    pass: String;
    nombre: String;
    apellido: String;
    telefono: Number;
    correo: String;
    dni: Number;
    direccion: String;
}

const ClienteSchema = new Schema({
    user: String,
    pass: String,
    nombre: String,
    apellido: String,
    telefono: Number,
    correo: String,
    dni: Number,
    direccion: String
})

export default model<Cliente>('Cliente', ClienteSchema)