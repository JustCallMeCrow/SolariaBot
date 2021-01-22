module.exports = {
    name: 'hola',
    description: "Solaria os saluda",
    execute(message, args) {
        message.channel.send("A vuestro servicio");
    }
}