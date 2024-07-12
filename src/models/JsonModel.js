import mongoose from 'mongoose';

/**
 * Este modelo se utiliza para poder agregar una nueva collection a la base de datos,
 * se hace de esta manera para que se puedan agregar archivos .json que tengan distintas
 * estructuras de datos.
 */
const jsonSchema = new mongoose.Schema({
    nombre: String,
    contenido: mongoose.Schema.Types.Mixed,
});

const JsonModel = mongoose.model('Json', jsonSchema);

export default JsonModel;
