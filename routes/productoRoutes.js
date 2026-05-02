const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto'); // Importamos el molde 
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
// ruta para validaciones
router.post('/', upload.single('imagen'), [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('precio').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isInt(),
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
      res.redirect('/'); 
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar', error });
    }
});

//ruta para eliminar

router.post('/eliminar/:id', async (req, res) => {
    console.log("Se recibió una oredn para eliminar el ID:", req.params.id);
    try {
        const id = req.params.id;

        await Producto.findByIdAndDelete(id); 
        res.redirect('/'); // Esto nos regresa a la vitrina
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).send("Error interno al intentar eliminar");
    }
});

// ruta para editar
router.post('/editar/:id', async(req, res) => {
    console.log("Intentando editar ID:", req.params.id);
    console.log("Datos recibidos:", req.body);
    
    try{
        const id = req.params.id;
        const nuevosDatos= req.body;

        await Producto.findByIdAndUpdate(id, nuevosDatos);

        res.redirect('/');
    } catch (error) {
        console.log("Error al editar:", error);
        res.status(500).send("No se pudo actualizar los datos");
    }
});

module.exports = router;