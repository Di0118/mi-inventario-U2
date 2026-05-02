//importar la libreria para conectar MongoDB
const mongoose = require('mongoose');

// Definir el esquema 
const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },

    precio: { type: Number, required: true },

    descripcion: { type: String },

    imagen: { type: String },

    fechaCreacion: {type: Date, default: Date.now},

    stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Producto', productoSchema);