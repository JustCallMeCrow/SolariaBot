module.exports = {
    name: 'stop',
    description: "Para la lista de reproducción",
    execute(message, args, queue) {

        const serverQueue = queue.get(message.guild.id);

        if (!message.member.voice.channel)
            return message.channel.send(
                "No puedes parar la música si no la estás escuchando!"
            );
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
}