###Estructura de directorios
```
admin-backend/ -> Es la raiz de nuestro proyecto
|
│
├── src/ -> Source: Contiene la logica principal de la aplicacion
│   ├── api/ -> Logica de nuestra API REST
|   |   ├── config/ -> Archivo para obtener y exportar la info de las variables de entorno .env
|   |   ├── controllers/ -> Logica para gestionar peticiones y respuestas, req y res
|   |   ├── database/ -> Crea el pool de conexiones a la BBDD MySQL
|   |   ├── middlewares/ -> Funciones que se ejecutan entre la req y la res
|   |   ├── models/ -> Comunicaciones con la BBDD
|   |   ├── routes/ -> Desacoplamos las rutas que originalmente iban en el index.js, llaman al controlador
|   |   ├── utils/ -> Logica para trabajar con archivos y rutas de proyecto
|   |   |
│   ├── public/ -> Archivos estaticos (img, css, js)
│   └── views/ -> Vistas EJS que sirve el back
|
├── .env -> Las variables que contienen info sensible, constraseñas, puertos, etc
├── index.js -> Archivo de arranque del servidor, que centraliza toda la logica de la aplicacion
├── package.json -> "Libro" de instrucciones que centraliza la info que necesita nuestra app para funcionar
├── README.md -> Documentacion 
```