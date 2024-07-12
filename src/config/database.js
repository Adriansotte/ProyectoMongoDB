import mongoose from "mongoose";

// En esta clase se define la base de datos en la cual vamos a trabajar
// y se conecta a la misma. Se exporta para poder utilizar esta configuracion
// en distintos archivos.
const url = 'mongodb://127.0.0.1:27017/proyectoMongoDB';

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error al conectar a la base de datos.'));
db.once('open', function callback() {
    console.log("Conectado a MongoDB")
})

export default db;
