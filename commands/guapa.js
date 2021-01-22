let frases = require('../frases/guapaFrases.js');
module.exports = {
    name: 'guapa',
    description: "Gracias por el cumplido",
    execute(message, args) {
        message.channel.send(frases[0][(parseInt(Math.random() * frases[0].length))]);
    }
}