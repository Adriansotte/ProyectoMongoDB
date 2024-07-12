import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Este modelo representa la colleccion de personas que se ha añadido a la base de datos.
 * Dado que se trata de una abse de datos no relacional, no tiene atributos en si, con esto
 * lo que hacemos es tener una colleccion en la cual cada registro tendra la estructura de 
 * una persona con sus atributos.
 */
const personaSchema = new Schema({
    nombre: String,
    edad: Number,
    pais: String
}, {
    versionKey: false
});

const PersonaModel = mongoose.model('personas', personaSchema);

export default PersonaModel;
