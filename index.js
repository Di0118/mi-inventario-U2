// llamar a la libreria Express
const express = require('express');
const app = express();
// importar mongoose
const mongoose = require('mongoose');
// importar motor de plantillas
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');
const { body, validationResult }= require('express-validator');
const http = require('http'); 
const { Server } = require('socket.io');
const server = http.createServer(app); //  servidor usando Express
const io = new Server(server); // conectar Socket.io al servidor

// conexión a mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mi_inventario')
  .then(() => console.log('Conectado a MongoDB con éxito ✅'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// configuración de handlebars 
app.engine('handlebars', engine({
    extname: '.handlebars',
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts') //layouts
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

// MIDDLEWARES
app.use(express.json()); // para que el servidor entienda JSON
//para entender datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'miClave',
    resave: false,
    saveUninitialized: false
}));
//  permite que el navegador pueda ver las fotos de la carpeta uploads
app.use('/uploads', express.static('uploads'));

//guadia de seguridad
function asegurarAutenticacion(req, res, next) {
    if (req.session.usuarioId) {
        return next(); 
    }
    res.redirect('/login'); 
}

// RUTA PRINCIPAL 
app.get('/', asegurarAutenticacion, async (req, res) => {
   try{
    //buscar
    const {buscar} = req.query;
    let filtro= {};

    if (buscar){
        filtro = { nombre: { $regex: buscar, $options: 'i' } };
        }
    //1. pedir a mongodb los productos
    const productos = await Producto.find(filtro).lean();
    res.render('home',{ productos, buscar});
     //2. cargar la pagina y enviar la lista de productos
    }catch (error) {
        console.log("Error al buscar productos:", error);
        res.status(500).send("Error en el servidor");
    }
   });

//ruta para mostrar el formulario de agregar un producto
app.get('/nuevo-producto', asegurarAutenticacion, (req, res) => {
    res.render('nuevo'); 
});

app.get('/editar-producto/:id', asegurarAutenticacion, async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).lean();
        res.render('editar', { producto });
    } catch (error) {
        res.redirect('/');
    }
});
app.post('/editar-producto/:id', asegurarAutenticacion, async (req, res) => {
    try {
        const { nombre, precio, stock, descripcion } = req.body;
        await Producto.findByIdAndUpdate(req.params.id, {
            nombre,
            precio,
            stock: parseInt(stock) || 0,
            descripcion
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Error al actualizar");
    }
});
//ruta para Login
app.get('/login', (req, res) => {
    res.render('login');
});
// procesa login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const usuarioEncontrado = await Usuario.findOne({ email });
    if (usuarioEncontrado) {
         const coinciden = await bcrypt.compare(password, usuarioEncontrado.password);
        
         if (coinciden) {
            req.session.usuarioId = usuarioEncontrado._id;
            return res.redirect('/'); 
         }
        }
    res.send('Email o contraseña incorrectos. <a href="/login">Intentar de nuevo</a>');
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); 
    });
});

// RUTA TEMPORAL PARA CREAR TU USUARIO 
app.get('/registrar-usuario-admin', async (req, res) => {
    try {
        const admin = new Usuario({
            email: "admin@correo.com",
            password: "123" 
        });
        await admin.save();
        res.send("Usuario admin creado con éxito. Ya puedes ir a /login");
    } catch (error) {
        res.send("El usuario ya existe o hubo un error.");
    }
});
app.get('/api/buscar-sugerencias', asegurarAutenticacion, async (req, res) => {
    try {
        const { q } = req.query;
        const sugerencias = await Producto.find({ 
            nombre: { $regex: q, $options: 'i' } 
        }).limit(5).select('nombre'); 
        
        res.json(sugerencias);
    } catch (error) {
        res.status(500).json([]);
    }
});
// CONECTAR ARCHIVO DE RUTAS (API)
app.use('/api/productos', require('./routes/productoRoutes'));

// Ruta para ver el chat 
app.get('/chat', asegurarAutenticacion, (req, res) => {
    res.render('chat');
});
// Lógica del Chat
io.on('connection', (socket) => {
    console.log('Alguien se conectó al chat');

    // Escucha cuando un usuario envía un mensaje
    socket.on('enviar-mensaje', (datos) => {
        // Reenvía el mensaje a TODOS los usuarios conectados
        io.emit('mensaje-recibido', datos);
    });
});
// ENCENDER EL SERVIDOR
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor y Chat corriendo en http://localhost:${PORT}`);
});







