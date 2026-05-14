const mongoose = require('mongoose');
const Producto= require('./models/Producto');
const Categoria= require('./models/Categoria');

const MONGO_URI = 'mongodb://127.0.0.1:27017/mi_inventario';

const sembrarDatos = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado para sembrar datos...');

        //Limpiar datos antiguos
        console.log('Limpiando base de datos...');
        await Producto.deleteMany({});
        await Categoria.deleteMany({});

        //1. Categorias
        const cats = await Categoria.insertMany([
            { nombre: 'Llaveros' },
            { nombre: 'Animales' },
            { nombre: 'Plantas' },
            { nombre: 'Personalizados' }
        ]);
        
        // 2. Crear Productos
        const productos = [
            { nombre: 'Llavero Capibara', precio: 4, stock: 10, descripcion: 'Tierno llavero de capibara tejido a mano', imagenUrl: '/uploads/capibara.jpeg', categoriaId: cats[0]._id },
            { nombre: 'Conejito Celeste', precio: 18, stock: 5, descripcion: 'Conejo de peluche suave color celeste', imagenUrl: '/uploads/conejo.jpeg', categoriaId: cats[1]._id },
            { nombre: 'Girasol en Maceta', precio: 14, stock: 3, descripcion: 'Girasol tejido decorativo para escritorio', imagenUrl: '/uploads/girasol.jpg', categoriaId: cats[2]._id },
            { nombre: 'Tulipan en Maceta', precio: 25, stock: 2, descripcion: 'Tulipan tejido ideal para decorar tu escritorio', imagenUrl: '/uploads/tulipan.jpg', categoriaId: cats[2]._id },
            { nombre: 'Llavero Snoopy', precio: 4, stock: 15, descripcion: 'Mini snoopy fresa', imagenUrl: '/uploads/snoopy.jpeg', categoriaId: cats[0]._id },
            { nombre: 'Peluche Capibara', precio: 20, stock: 4, descripcion: 'Suave capibara', imagenUrl: '/uploads/peluche.jpeg', categoriaId: cats[1]._id },
            { nombre: 'Caperucita', precio: 12, stock: 6, descripcion: 'Hermosa muñeca de caperucita', imagenUrl: '/uploads/caperucita.jpeg', categoriaId: cats[2]._id },
            { nombre: 'Futbolista Personalizado', precio: 30, stock: 1, descripcion: 'Futbolista basado en fotos del cliente', imagenUrl: '/uploads/personalizado.jpeg', categoriaId: cats[3]._id },
            { nombre: 'Rosario personalizado', precio: 15, stock: 20, descripcion: 'Hermoso rosario color turquesa', imagenUrl: '/uploads/rosario.jpeg', categoriaId: cats[0]._id },
            { nombre: 'Gatitos', precio: 11, stock: 7, descripcion: 'Gatos para compartir', imagenUrl: '/uploads/gato.jpeg', categoriaId: cats[1]._id }
        ];
        await Producto.insertMany(productos);
        console.log('¡Datos sembrados con éxito! (10 productos y 4 categorías)');
        
        process.exit(); // Cerrar el proceso al terminar
    } catch (error) {
        console.error('Error sembrando datos:', error);
        process.exit(1);
    }
};

sembrarDatos();