const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre de la categoría es obligatorio'],
        trim: true 
    }
}, { timestamps: true }); //fecha de creación y actualización

module.exports = mongoose.model('Categoria', CategoriaSchema);