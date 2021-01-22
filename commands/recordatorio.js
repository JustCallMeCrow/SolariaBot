module.exports = {
    name: 'recordatorio',
    description: "Coloca un recordatorio",
    execute(message, args) {
        message.channel.send(args);
    }
}