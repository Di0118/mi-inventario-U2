const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto'); // Importamos el molde 
const Categoria= require('../models/Categoria');
const { body, validationResult } = require('express-validator');


// 1. OBTENER TODOS LOS PRODUCTOS (GET /api/products)
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoriaId'); // busca en la base de datos
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

// 2. OBTENER UN PRODUCTO POR ID (GET /api/products/:id)
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoriaId');
        if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});
// 3. CREAR PRODUCTO (POST /api/products)
router.post('/', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isInt({ min: 0 }).withMessage('El stock no puede ser negativo'),
    body('categoriaId').notEmpty().withMessage('La categoría es obligatoria'),
   
    body('imagenUrl').notEmpty().withMessage('Debe proporcionar una URL de imagen')
], async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
         const nuevoProducto = new Producto({
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
            descripcion: req.body.descripcion,
            imagenUrl: req.body.imagenUrl,
            categoriaId: req.body.categoriaId 
        });

        await nuevoProducto.save(); 
        res.status(201).json(nuevoProducto); 
    } catch (error) {
        console.error("Error al guardar producto mediante la API:", error);
        res.status(400).json({ mensaje: 'Error al guardar', error: error.message });
    }
});

// 4. EDITAR PRODUCTO (PUT /api/products/:id) 
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar', error: error.message });
    }
});

// 5. ELIMINAR PRODUCTO (DELETE /api/products/:id)
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json({ mensaje: 'Eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

module.exports = router;

