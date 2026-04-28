//importar la libreria para conectar MongoDB
const mongoose = require('mongoose');

// Definir el esquema 
const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },

    precio: { type: Number, required: true },

    descripcion: { type: String },

    imagen: { type: String },// Aquí guardaremos la ruta de la foto

    fechaCreacion: {type: Date, default: Date.now},
});

// Exportamos el modelo para usarlo en otros archivos
module.exports = mongoose.model('Producto', productoSchema);