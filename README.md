# MercApp - Mi Tienda 

 **MercApp** es una Single Page Application (SPA) desarrollada con **Vue 3** para la gestión y exhibición de catálogos de amigurumis tejidos a mano Este proyecto forma parte de la Unidad43 de Aplicaciones Web.

La aplicación web consume de forma dinámica una **API REST** propia construida sobre Node.js y Express, desplegada en la nube, permitiendo realizar operaciones de lectura y escritura en la base de datos.
---

## Datos del Estudiante
* **Institución:** Universidad Politécnica Salesiana 
* **Carrera:** Ingeniería en Software (Cuarto Nivel)
* **Asignatura:** Aplicaciones Web
---
##Enlaces del Proyecto
*Frontend (Netlify): https://astounding-swan-4c6a0c.netlify.app
*Backend API (Railway): https://mi-inventario-u2-production.up.railway.app/api
---
## Funcionalidades Implementadas

1.Arquitectura SPA: Navegación fluida sin recargar la página usando vue-router.
2.Consumo de API en producción: La aplicación obtiene los productos y categorías desde una API desplegada en Railway.
3.Catálogo dinámico: Visualización de productos en tiempo real desde la base de datos.
4.Buscador de productos: Permite buscar por nombre usando peticiones a la API.
5.CRUD de productos: Crear, editar y eliminar productos mediante formularios con validación básica.
6.Modal interactivo: Uso de componentes para agregar y editar productos de forma dinámica.
7.Manejo de errores: Se controlan errores de conexión con la API (ej: CORS, errores 404, etc.).
8.Despliegue completo:
*Frontend en Netlify
*Backend en Railway
*Base de datos en MongoDB Atlas
---
## Tecnologías Utilizadas

* **Frontend:** Vue 3 , Vite, HTML5, CSS.
* **Backend:** Node.js, Express , Mongoose.
* **Persistencia:** MongoDB Atlas.
* **Cliente HTTP:** Axios para el despacho asíncrono de peticiones.
---
## Variables de Entorno
*Backend (.env)
MONGODB_URI=tu_conexion_mongodb
PORT=3000
FRONTEND_URL=https://astounding-swan-4c6a0c.netlify.app
*Frontend (.env.production)
VITE_API_URL=https://mi-inventario-u2-production.up.railway.app/api
---
## Instrucciones uso
1. Ingresar al sistema desde el navegador:
   * Frontend: https://astounding-swan-4c6a0c.netlify.app

2. Explorar el catálogo de productos:
   * Ver productos disponibles
   * Filtrar por categorías
   * Buscar productos por nombre

3. Gestionar productos:
   * Agregar nuevos producto
   * Editar productos existentes
   * Eliminar productos

4. La información se obtiene desde una API desplegada en Railway y almacenada en MongoDB Atlas.
---
##Evidencias
**Pagina principal funcionando:**
<img width="855" height="853" alt="image" src="https://github.com/user-attachments/assets/470e2f4d-b478-4280-a4b7-df766abb6fdb" />
**Modal para agregar y editar productos:**
<img width="605" height="817" alt="image" src="https://github.com/user-attachments/assets/1e6638cf-96c2-437b-83c9-c734794ea7a8" />
**Buscador funcionando**
<img width="672" height="436" alt="image" src="https://github.com/user-attachments/assets/b5740ce8-3cf0-45f6-ad88-9ef9d8a9fe67" />
**Categorias cargando**
<img width="262" height="217" alt="image" src="https://github.com/user-attachments/assets/3652c184-9219-4748-810d-375929961693" />
**Informacion del producto cargando:
<img width="887" height="496" alt="image" src="https://github.com/user-attachments/assets/109dbfab-c099-40d2-82fd-aa6399164194" />
**Despliege en Netlify**
<img width="644" height="287" alt="image" src="https://github.com/user-attachments/assets/d4b4871b-61c3-40f8-861d-1f5515814f7f" />
**Despliegue en Railway**
<img width="892" height="444" alt="image" src="https://github.com/user-attachments/assets/db11528d-3063-4214-9591-8c236cad71ca" />


---
En este proyecto se logró implementar una aplicación web completa conectando un frontend con una API REST en producción. Se resolvieron problemas reales como configuración de variables de entorno, despliegue en la nube y errores de CORS, logrando que la aplicación funcione correctamente en internet.

