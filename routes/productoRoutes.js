const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto'); // Importamos el molde 
const multer = require('multer');
const path = require('path');


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


// RUTA PARA OBTENER TODOS LOS PRODUCTOS (GET)
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find(); // busca en la base de datos
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
});

// RUTA PARA CREAR UN PRODUCTO (POST)
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const nuevoProducto = new Producto({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.file ? req.file.filename : 'default.jpg' // guarda el nombre del archivo
        });
        await nuevoProducto.save(); // va ala base de datos
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar', error });
    }
});
module.exports = router;