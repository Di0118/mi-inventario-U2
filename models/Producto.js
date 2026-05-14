// importar la libreria para conectar MongoDB
const mongoose = require('mongoose');

// Definir el esquema 
const productoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'] 
    },
    descripcion: { 
        type: String, 
        required: [true, 'La descripción es obligatoria'] 
    },
    precio: { 
        type: Number, 
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'] 
    },
    imagenUrl: { 
        type: String, 
        required: [true, 'La URL de la imagen es obligatoria'] 
    },
    categoriaId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categoria', 
        required: [true, 'La categoría es obligatoria'] 
    },
    stock: { 
        type: Number, 
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'] 
    },
    fechaCreacion: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Producto', productoSchema);