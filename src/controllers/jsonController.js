import JsonModel from "../models/JsonModel.js";
import multer from 'multer';

// Con estas dos variable controlamos el middleware para poder subir archivos .json
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Pre:---
 * Post: metodo que se encarga de devolver todos las colecciones guardadas en nuestra base 
 *       de datos.
 */
export const mostrar = async (req, res) => {
    try {
        const documentos = await JsonModel.find();
        res.render('index', { documentos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la lista de documentos JSON');
    }
}

// Middleware de Multer para manejar la carga de un solo archivo con el campo 'archivo' en el formulario
export const crear = upload.single('archivo');

/**
 * Pre:---
 * Post: metodo que, primero comprueba si se ha mandado un archivo, verifica si existe algun
 *       archivo con el mismo nombre y por ultimo crea un objeto del modelo Json en la base 
 *       de datos.
 */
export const crearArchivo = async (req, res) => {
    try {
        // Verifica si se ha enviado un archivo
        if (!req.file) {
            return res.status(400).send('<script>alert("No se proporcionó ningún archivo JSON."); window.location="/";</script>');
        }
        // Verifica si ya existe un archivo con el mismo nombre
        const existeArchivo = await JsonModel.exists({ nombre: req.file.originalname });
        if (existeArchivo) {
            return res.send('<script>alert("El archivo que tratas de subir ya existe en la base de datos."); window.location="/";</script>');
        }
        const nuevoJson = new JsonModel({
            nombre: req.file.originalname,
            contenido: JSON.parse(req.file.buffer.toString())
        });
        // Guardamos el nuevo documento en la base de datos
        await nuevoJson.save();
        // Retornamos al index
        res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.send('<script>alert("Error al procesar el JSON. Verifica el formato."); window.location="/";</script>');
    }
}

/**
 * Pre:---
 * Post: metodo el cual muestra el detalle del archivo .json cuya id es enviada por parametro.
 */
export const mostrarDetalle = async (req, res) => {
    try {
        const id = req.params.id;
        const documento = await JsonModel.findById(id);
        res.render('detalle', { documento });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los detalles del documento JSON');
    }
}

/**
 * Pre:---
 * Post: metodo que recibe el id del archivo json enviado como parametro y lo eliminar
 *       de la base de datos.
 */
export const borrarDocumento = async (req, res) => {
    try {
        const id = req.params.id;
        const documento = await JsonModel.findById(id);
        // Verifica si el documento existe
        if (!documento) {
            return res.status(404).send('Documento no encontrado');
        }
        // Elimina el documento de la colección
        await JsonModel.deleteOne({ _id: id });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al borrar el documento JSON');
    }
}