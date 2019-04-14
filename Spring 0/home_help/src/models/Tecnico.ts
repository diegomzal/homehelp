import mongoose, { Schema, model } from 'mongoose';

export interface Tecnico extends mongoose.Document {
    user: String;
    pass: String;
    nombre: String;
    apellido: String;
    telefono: Number;
    correo: String;
    dni: Number;
    direccion: String;
    especialidad: String;
}

const TecnicoSchema = new Schema({
    user: String,
    pass: String,
    nombre: String,
    apellido: String,
    telefono: Number,
    correo: String,
    dni: Number,
    direccion: String,
    especialidad: String
})

export default model<Tecnico>('Tecnico', TecnicoSchema)