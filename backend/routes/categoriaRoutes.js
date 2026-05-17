const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria'); 

// Ruta para obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
    }
});

module.exports = router;