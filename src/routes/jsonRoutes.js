import express from "express";
import { mostrar, crear, mostrarDetalle, borrarDocumento, crearArchivo } from "../controllers/jsonController.js";

/**
 * Este archivo contiene las rutas que se van a utilizar para manejar las peticiones
 * del usuario segun la inserción de un archivo .json.
 */
const jsonRouter = express.Router();

//Ruta para enseñar todos los documentos .json listados por pantalla
jsonRouter.get('/', mostrar);

//Ruta para agregar un nuevo archivo .json a la base de datos.
jsonRouter.post('/crear', crear, crearArchivo);

//Ruta para enseñar los datos de cada archivo .json.
jsonRouter.post('/detalle/:id', mostrarDetalle);

//Ruta para borrar un documento .json de la base de datos.
jsonRouter.get('/borrar/:id', borrarDocumento);

export default jsonRouter;
