require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io');

const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');
const Categoria = require('./models/Categoria');
const categoriaRoutes = require('./routes/categoriaRoutes');
const productoRoutes = require('./routes/productoRoutes');

const server = http.createServer(app);
const allowedOrigins = [
  'http://localhost:5173',
  'https://astounding-swan-4c6a0c.netlify.app'
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json()); // para que el servidor entienda JSON
app.use(express.urlencoded({ extended: true })); // para entender datos de formularios
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // permite ver las fotos de la carpeta uploads

app.use(session({
    secret: 'miClave',
    resave: false,
    saveUninitialized: false
}));
// conexión a mongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB Atlas con éxito '))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// endpoint health
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timeStamp: new Date(),
        message: 'El servidor MercApp esta respondiendo con éxito'
    });
});

// ENRUTAMIENTO 
app.use('/api/products', productoRoutes);     //  GET/POST/PUT/DELETE /api/products
app.use('/api/categories', categoriaRoutes);   //  GET /api/categories


// configuración de handlebars 
app.engine('handlebars', engine({
    extname: '.handlebars',
    defaultLayout: 'main', 
    layoutsDir: path.join(__dirname, 'views/layouts') 
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

// Guardia de seguridad
function asegurarAutenticacion(req, res, next) {
    if (req.session.usuarioId) {
        return next(); 
    }
    res.redirect('/login'); 
}

// RUTA PRINCIPAL 
app.get('/', asegurarAutenticacion, async (req, res) => {
   try {
        const { buscar } = req.query;
        let filtro = {};

        if (buscar) {
            filtro = { nombre: { $regex: buscar, $options: 'i' } };
        }
        const productos = await Producto.find(filtro).lean();
        res.render('home', { productos, buscar });
    } catch (error) {
        console.log("Error al buscar productos:", error);
        res.status(500).send("Error en el servidor");
    }
});

//   mostrar el formulario de agregar un producto
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
        const { nombre, precio, descripcion, categoriaId, stock, imagenUrl } = req.body;
        
        await Producto.findByIdAndUpdate(req.params.id, {
            nombre,
            precio: parseFloat(precio) || 0,
            stock: parseInt(stock) || 0,
            descripcion,
            imagenUrl,
            categoriaId
        });
        
        res.redirect('/');
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).send("Error al actualizar");
    }
});

// Ruta para Login
app.get('/login', (req, res) => {
    res.render('login');
});

// Procesar login
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

('/api/buscar-sugerencias', asegurarAutenticacion, async (req, res) => {
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

// Ruta para ver el chat 
app.get('/chat', asegurarAutenticacion, (req, res) => {
    res.render('chat');
});

// Lógica del Chat
io.on('connection', (socket) => {
    socket.on('enviar-mensaje', (datos) => {
        io.emit('mensaje-recibido', datos);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});