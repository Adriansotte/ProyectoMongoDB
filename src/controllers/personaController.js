import PersonaModel from "../models/PersonasModel.js";

/**
 * Pre:---
 * Post: este metood recoge todas las personas que tenemos ingresadas en la base de 
 *       datos y las devuelve a la vista para representarlas.
 */
export const mostrar = async (req, res) => {
    try {
        const personas = await PersonaModel.find();
        res.render('personas', { personas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos de la base de datos');
    }
};

/**
 * Pre:---
 * Post: metodo que mediante los atributos que recibe como parametros, agrega un nuevo registro
 *       a nuestra base de datos.
 */
export const crear = async (req, res) => {
    const persona = new PersonaModel({
        nombre: "Santi",
        edad: 23,
        pais: "españa"
    });
    const resultado = await persona.save();
    console.log(resultado)
}

/**
 * Pre:---
 * Post: metodo el cual recibe por los parametros el Id del objeto cuyos datos
 *       van a ser actualizados. 
 */
export const actualizar = async (req, res) => {
    const id = req.params.id;
    const { nombre, edad, pais } = req.body;
    try {
        const persona = await PersonaModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    nombre: nombre,
                    edad: edad,
                    pais: pais
                }
            },
            { new: true } 
        );
        if (!persona) {
            return res.status(404).send("Persona no encontrada");
        }
        res.redirect('/personas');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar la persona");
    }
};

/**
 * Pre:---
 * Post: Metodo el cual recibe como parametros el id del objeto en la base de datos
 *       el cual sera eliminado.
 */
export const eliminar = async (req, res) => {
    const persona = await PersonaModel.deleteOne({
        _id: id
    })
}