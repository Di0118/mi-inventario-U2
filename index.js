//llamar ala libreria Express con require 
const express = require('express');
//crear aplicación
const app = express();

//importar mongoose
const mongoose = require('mongoose');
//conexion a mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mi_inventario')
  .then(()=> console.log('Conectado a MongoDB con éxito✅'))
  .catch((error)=> console.error('Error al conectar a MongoDB:', error));
  

//definir puerto 3000  estándar en desarrollo
const PORT = 3000;

//ruta principal: cuando el usuario entre a la pagina principal"/"
// req= pedido | res= respuesta
app.get('/', (req, res) => {
  res.send('MiInventarioExpress funcionando ');
});
//para que el servidor entienda la informacion enviada
app.use(express.json());
//conectar el archivo de rutas
app.use('/api/productos', require('./routes/productoRoutes'));

//encender el servidor para q "escuche"
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});