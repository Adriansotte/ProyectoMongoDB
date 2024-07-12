import express from "express";
import { mostrar, actualizar, crear, eliminar } from "../controllers/personaController.js";

/**
 * Archivo el cual contiene las rutas para manejar la collection de la base de datos.
 */
const personasRouter = express.Router();

//Ruta para mostrar todas las personas dentro de la base de datos.
personasRouter.get('/personas', mostrar);

//Ruta para actualizar el modelo de persona.
personasRouter.post('/actualizar/:id', actualizar);

export default personasRouter;

