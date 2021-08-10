Finalidad del proyecto Este proyecto tiene el enfoque de presentar una funcionalidad de API, para ello permite realizar una serie de consultas tales como las categorias, subcategorias y productos apoyandonos de la API de Mercado Libre.

La documentación de funcionalidad se puede comprender mejor dentro del siguiente enlace: https://app.swaggerhub.com/apis-docs/DROW900/ApiTecla/1.0#/

Versiones de software: -NodeJS v14.17.1 -npm v6.14.13 "cors": "^2.8.5", "dotenv": "^10.0.0", "express": "^4.17.1", "express-rate-limit": "^5.3.0", "node-fetch": "^2.6.1", nodemon": "^2.0.12", "sequelize": "^6.6.5", "tedious": "^11.4.0" "jsonwebtoken": 8.5.1, "ejs": 3.1.6

Inicio de Aplicación

Para poder trabajar con este proyecto se utilizará el manejador de paquetes npm con el fin de instalar los módulos necesarios utilizando el siguiente comando en consola "npm install" dentro del directorio donde se encuentren los archivos del proyecto.

Una vez instalados los recursos necesarios se pueden realizar las consultas por medio de la URL del servidor y los ejemplos de la documentación mostrada anteriormente

Para MSSQL es necesario generar una base de datos y configurarla en un archivo .ENV, generando las variables DB_USER, DB_PASS, DB_NAME, DB_PORT y DB_HOST.

Es necesario definir el HOST y puerto con el que funcionará el servidor, además de una SECRET_KEY que nos permitirá firmar correctamente eltoken generado con JWT.
