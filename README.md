# Tarea-Unidad 2- Programación del lado del servidor

**Estudiante:** Diana Calderón
**Carrera:** Ingeniería en Software
**Nivel**: Cuarto
**MiInventario**

//cambiar
## Funcionalidades Implementadas
* **Clonación y configuración del entorno base:** Configuración inicial del repositorio, en el código 1.44
* **Redefinición del JSON y carga de películas:** Se agregaron 8 películas con sinopsis detalladas, géneros y fechas de estreno 
* **Lógica Dinámica de Precios :** El sistema calcula automáticamente si es "Estreno" o "Cartelera Regular" comparando fechas.
* **Spinner de Carga :** Implementación de un cargador visual con un retraso controlado de 5 segundos.
* **Efectos visuales :** Transiciones suaves con fadeIn para mostrar el catálogo.
* **Formulario de contacto y validacion:** En la pagina contacto se creo validaciones personalizadas mediante JavaScript. El sistema verifica que el nombre no esté vacío, que el correo sea válido y que el mensaje tenga una extensión obligatoria de entre 20 y 50 caracteres, mostrando mensajes de error dinámicos al usuario.
* **Se implementó una ventana modal de Bootstrap**  carga dinamicamente el trailer de cada pelicula, sin salir de la pagina principal, optimizando la experiencia del usuario al no recargar la pagina.
* **Implementacion de una alerta de bienvenida única** me diante localStorage se muestra un mensaje de Binvenida solo la primera vez que se entra a la pagina, evitando que el mensaje se repita siempre en proximas visitas.
* **Diseño Visual** se personalizo el tema mediante Google Fonts (Poppins), una paleta de colores minimalista y un footer.
* **Sistema de reseñas y calificaciones**se implementó una seccion de comentarios dinamica que carga datos desde un JSON externo.Incluye un sistema de calificación visual con estrellas del 1 al 5.

## Estructura dek Proyecto
* `index.html`: Página principal con el catálogo dinámico.
* `js/app.js`: Lógica de carga AJAX y control del spinner.
* `data/peliculas.json`: Fuente de datos de las películas.
* `pages/detalle.html`: Visualización detallada de cada película.

## Instrucciones de uso
1. Abrir la carpeta en Visual Studio Code
2. Ejecutar con la extension  Live Server para visualizar el catálogo de películas.
3. Esperar los 5 segundos de carga inicial para poder ver la lista de peliculas.

