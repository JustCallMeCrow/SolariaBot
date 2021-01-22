const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'fotos',
    description: "Selfies",
    execute(message, args) {
        const attachment = new MessageAttachment("./img/" + parseInt(Math.random() * 7 + 1) + ".jpg");
        message.channel.send(`${message.author} disfruta,`, attachment);
    }


}