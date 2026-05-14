const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto'); // Importamos el molde 
const Categoria= require('../models/Categoria');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

// dónde y cómo se guardan los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'uploads'); // se guardan en la carpeta uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para que no se repitan
    },
});
// Validación: Solo imágenes y máximo 2MB 
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // 2MB máximo
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: Solo se permiten imágenes (jpeg, jpg, png, gif)"));
    }
});


// 1. OBTENER TODOS LOS PRODUCTOS (GET /api/products)
router.get('/products', async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoriaId'); // busca en la base de datos
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos', error });
    }
});

// 2. OBTENER UN PRODUCTO POR ID (GET /api/products/:id)
router.get('/products/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoriaId');
        if (!producto) return res.status(404).json({mensaje:'Producto no encontrado'});
        res.json(producto);
    } catch (error){
        res.status(500).json({ mensaje:'Error en el servidor'});
    }
});

// 3. CREAR PRODUCTO (POST /api/products)
router.post('/products', upload.single('imagen'), [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isInt({ min: 0 }).withMessage('El stock no puede ser negativo'),
    body('categoriaId').notEmpty().withMessage('La categoría es obligatoria')
], async (req, res) => {
    const errores= validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevoProducto = new Producto({
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
            descripcion: req.body.descripcion,
            imagen: req.file ? req.file.filename : 'default.jpg' // guarda el nombre del archivo
        });

        await nuevoProducto.save(); // va ala base de datos 
      res.status(201).json(nuevoProducto); // responder con el objeto creado
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar', error: error.message });
    }
});

// 4. EDITAR PRODUCTO (PUT /api/products/:id) 
router.put('/products/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al editar', error: error.message });
    }
});

// 5. ELIMINAR PRODUCTO (DELETE /api/products/:id)

router.delete('/products/:id', async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.json({ mensaje: 'Eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar' });
    }
});

// 6. OBTENER CATEGORÍAS (GET /api/categories) 
router.get('/categories', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener categorías' });
    }
});


module.exports = router;