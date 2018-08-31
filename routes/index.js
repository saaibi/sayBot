const express = require('express');

// El token de validación del Webhook, se configura como variable de entorno
const VALIDATION_TOKEN = process.env.FB_VALIDATION_TOKEN;

module.exports.fbm = function fbm(handler) {

    // Vamos a crear un enrutador para el webhook
    const fbmRouter = express.Router();

    // Terminal GET para validación del webhook
    // Referirse a la guía de Facebbok para más detalles:
    // https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
    fbmRouter.get('/', (req, res) => {
        console.log('Validando el webhook...');

        const mode = req.query['hub.mode'],
            token = req.query['hub.verify_token'],
            challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && token === VALIDATION_TOKEN) {
            console.log('Se ha validado el webhook 😉');
            res.status(200).send(challenge);
        } else {
            console.log('La validación del webhook ha fallado ☹')
            res.sendStatus(403);
        }
    });

    // Terminal POST para el webhook
    // Referirse a la documentación de Facebook para más detalles:
    // https://developers.facebook.com/docs/messenger-platform/reference/webhook-events/messages
    fbmRouter.post('/', (req, res) => {
        const body = req.body;

        // Solo nos interesan los eventos de la página
        if (body.object === 'page') {
            // Puede ocurrir que recibamos un lote de muchos eventos
            body.entry.forEach(entry => {
                console.log('Evento recibido...');
                const messaging = entry.messaging[0];

                // Enviar el evento de mensajería al manejador
                if (messaging) {
                    handler(messaging);
                }
            });
            // Hay que responderle a facebook
            res.status(200).send('evento recibido');
        } else {
            // No es un evento de la página
            res.sendStatus(404);
        }
    });

    return fbmRouter;
}
