# Tarea - Unidad 2 - Programación del Lado del Servidor

**Estudiante:** Diana Calderón  
**Carrera:** Ingeniería en Software  
**Nivel:** Cuarto  
**Proyecto:** MiInventarioExpress (Sistema de Gestión de Amigurumis)

## Funcionalidades Implementadas (Fase 1 y 2)

*   **Configuración del Entorno de Servidor:** Creación de un servidor web funcional utilizando **Node.js** y el framework **Express**.
*   **Arquitectura MVC:** Organización profesional del proyecto mediante el patrón **Modelo-Vista-Controlador**, separando la lógica en carpetas (`models`, `routes`, `views`, `controllers`).
*   **Persistencia de Datos con MongoDB:** Configuración y conexión del servidor a una base de datos NoSQL mediante **Mongoose**.
*   **Definición de Esquemas (Models):** Creación del modelo `Producto`, definiendo la estructura para los amigurumis (nombre, precio, descripción e imagen) con validaciones de datos obligatorios.
*   **Gestión de Archivos Estáticos:** Configuración de carpetas públicas para archivos CSS, imágenes y la carpeta de subidas (`uploads`) para futuras fotos de productos.
*   **Control de Versiones:** Uso de Git y GitHub con un historial de commits organizado y configuración de `.gitignore` para la seguridad del proyecto.

## Estructura del Proyecto

*   `index.js`: Punto de entrada de la aplicación y configuración del servidor.
*   `models/Producto.js`: Definición del esquema de datos para MongoDB usando Mongoose.
*   `routes/`: Carpeta destinada a las rutas del servidor (API/Web).
*   `views/`: Carpeta para las plantillas dinámicas (Handlebars).
*   `public/`: Archivos de estilo (CSS) y scripts del lado del cliente.
*   `.gitignore`: Archivo para excluir carpetas pesadas como `node_modules`.

## Instrucciones de Uso

1.  **Requisitos previos:** Tener instalado **Node.js** y **MongoDB Community Server**.
2.  **Instalación:** Abrir la terminal en la carpeta del proyecto y ejecutar `npm install` para instalar las dependencias (Express, Mongoose).
3.  **Ejecución:** Iniciar el servidor con el comando `node index.js`.
4.  **Verificación:** Abrir el navegador en `http://localhost:3000` para confirmar que el servidor está activo y conectado a la base de datos.
