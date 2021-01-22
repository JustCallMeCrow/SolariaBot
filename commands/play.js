const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
    name: 'play',
    description: "Reproduce una canción",
    execute(message, args, queue) {
        executeMusic(message, args, queue);
    }
}

async function executeMusic(message, args, queue) {

    const serverQueue = queue.get(message.guild.id);

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "No estás en ningún canal de voz, no puedo tocar canciones sin ningún canal"
        );

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
            "Necesito permisos para unirte ¡Déjame entrar!"
        );
    }

    let song;
    if (ytdl.validateURL(args[0])) {
        const songInfo = await ytdl.getInfo(args[0]);
        song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };
    } else {
        const { videos } = await yts(args.join(" "));
        if (!videos.length) return message.channel.send("No encontré tu canción :(");
        song = {
            title: videos[0].title,
            url: videos[0].url
        };
    }

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);
        queueContruct.connection = connection;

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0], queueContruct, queue);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title} Otra canción para la cola!`);
    }
}

function play(guild, song, queueContruct, queue) {
    if (!song) {
        queueContruct.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = queueContruct.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            queueContruct.songs.shift();
            play(guild, queueContruct.songs[0], queueContruct, queue);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(queueContruct.volume / 5);
    queueContruct.textChannel.send(`Ahora está sonando: **${song.title}**`);
}