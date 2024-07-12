import express from "express";
import personasRouter from "./routes/personasRoute.js";
import jsonRouter from "./routes/jsonRoutes.js";

//Esta importacion es necesaria para la conexion con la base de datos, 
//aunque no se utilice en el codigo, tiene que estar.
import db from "./config/database.js";

const app = express();

//Configuramos para que la vista sea mediante modelo ejs.
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Configuramos desde donde va a buscar las rutas el proyecto.
app.use(jsonRouter);
app.use(personasRouter);

//Configuramos la carpeta public para que el prpyecto pueda acceder a esa carpeta.
app.use(express.static('public'));

//Damos una respuesta para la conexion completa.
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000')
});