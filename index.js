// Importar dependencias
const express = require('express'),
    // Para procesar la carga útil en formato JSON
    bodyParser = require('body-parser'),
    // Para acceder al ambiente de la aplicación en tiempo de ejecución
    cfenv = require('cfenv');

const messagingHandler = require('./handler'), // El controlador dummy
    fbmRouter = require('./routes').fbm(messagingHandler); // Enrutador de cara a facebook

// Crear la aplicación express y montar el enrutador
const app = express();
app.use('/mi-primer-bot', bodyParser.json(), fbmRouter);

// Cargar el ambiente cloudfoundry
const env = cfenv.getAppEnv();

// Iniciar el servidor con la configuración del ambiente
app.listen(env.port, env.bind,
    () => console.log(`Mi primer bot listo en ${env.bind}:${env.port}`)
);
