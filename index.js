// llamar a la libreria Express
const express = require('express');
const app = express();

// importar mongoose
const mongoose = require('mongoose');

// conexión a mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mi_inventario')
  .then(() => console.log('Conectado a MongoDB con éxito ✅'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// importar motor de plantillas
const { engine } = require('express-handlebars');

// configuración de handlebars 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views'); 

// MIDDLEWARES
app.use(express.json()); // para que el servidor entienda JSON

// RUTA PRINCIPAL 
app.get('/', (req, res) => {
    res.render('home'); 
});

// CONECTAR ARCHIVO DE RUTAS (API)
app.use('/api/productos', require('./routes/productoRoutes'));

// ENCENDER EL SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});