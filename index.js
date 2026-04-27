//llamar ala libreria Express con require 
const express = require('express');
//crear aplicación
const app = express();
//definir puerto 3000  estándar en desarrollo
const PORT = 3000;

//ruta principal: cuando el usuario entre a la pagina principal"/"
// req= pedido | res= respuesta
app.get('/', (req, res) => {
  res.send('MiInventarioExpress funcionando ');
});
//encender el servidor para q "escuche"
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});