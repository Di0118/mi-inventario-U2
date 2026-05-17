# MercApp - Mi Tienda 

 **MercApp**, una Single Page Application (SPA) desarrollada con **Vue 3** para la gestión y exhibición de catálogos de amigurumis tejidos a mano Este proyecto forma parte de la Unidad 3 de Aplicaciones Web.

La aplicación web consume de forma dinámica una **API REST** propia construida sobre Node.js y Express, comunicándose mediante Axios para realizar operaciones completas de lectura y escritura en la base de datos.

---

## Datos del Estudiante
* **Institución:** Universidad Politécnica Salesiana 
* **Carrera:** Ingeniería en Software (Cuarto Nivel)
* **Asignatura:** Aplicaciones Web
---

## Funcionalidades Implementadas

1. **Diseño de Arquitectura SPA:** Navegación fluida e instantánea entre secciones sin recargar el navegador utilizando `vue-router`.
2. **Catálogo Reactivo Dinámico:** Consumo en tiempo real del endpoint `GET /api/products` utilizando composables específicos (`useProducts`, `useApi`).
3. **Buscador y Filtro Integrados:** Barra de búsqueda funcional por texto (nombre/descripción) combinada con filtros interactivos por categoría de tejido.
4. **CRUD Completo con Formularios Validados:** Modal interactivo de alta y edición con enlace bidireccional (`v-model`), vigilantes (`watch`) y validación local de datos obligatorios, precios, stock y URLs de imagen válidas.
5. **Gestión Completa de Carrito de Compras:** Sistema en memoria global con funciones interactivas para sumar, restar, remover unidades y cálculo automático de totales computados (`computed`), respaldado con persistencia de datos en `localStorage`.
6. **Lazy Loading y Suspense:** Optimización de carga asíncrona para componentes pesados y rutas secundarias.

## Tecnologías Utilizadas

* **Frontend:** Vue 3 (Composition API, Single File Components), Vite, HTML5, CSS3 Semántico.
* **Backend:** Node.js, Express framework, Mongoose.
* **Persistencia:** MongoDB.
* **Cliente HTTP:** Axios para el despacho asíncrono de peticiones.

## Instrucciones uso

### 1. Clonar el Repositorio
```bash
git clone [https://github.com/TU_USUARIO_DE_GITHUB/tu-repositorio.git](https://github.com/TU_USUARIO_DE_GITHUB/tu-repositorio.git)
cd tu-repositorio