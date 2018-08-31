const request = require('request');

const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

/**
 * Enviar un mensaje de texto plano a un usuario
 * @param {string} recipient PSID del usuario destinatario
 * @param {string} text Texto
 */
function sendTextMessage(recipient, text) {
    // Referirse a la documentación de Facebook para ver la estructura completa del objeto
    // https://developers.facebook.com/docs/messenger-platform/reference/send-api
    const message = {
        recipient: {
            id: recipient
        },
        message: {
            text
        }
    }
    sendAPI(message);
}
function sendAPI(message) {
    return request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: ACCESS_TOKEN
        },
        method: 'POST',
        body: message,
        json: true
    }, (err, res) => {
        if (err) {
            console.error(`Error API Facebook: ${JSON.stringify(err)}`);
        }
        console.log(`Respuesta API Facebook: ${JSON.stringify(res.body)}`);
    });
}

module.exports = {
    sendTextMessage
}
