const fbAPI = require('../FBAPI');

module.exports = function messagingEventHandler(messaging) {
    const psid = messaging.sender.id,
        message = messaging.message.text;

    console.log(`Evento de mensajería: ${JSON.stringify(messaging)}`);
    
    // Enviar un mensaje de respuesta
    const response = `Recibí: ${message}`;
    fbAPI.sendTextMessage(psid, response);
}
