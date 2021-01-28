const playList = require('./playListData.js');
const ytdl = require("ytdl-core");
const yts = require("yt-search");

module.exports = {
  name: 'loop',
  description: "Realiza un bucle sobre la cola actual",
  execute(message, args, queue) {
    executeLoop(message, args, queue)
  },
}

async function executeLoop(message, args, queue) {
  if(queue) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)return message.channel.send("No estás en ningún canal de voz, no puedo tocar canciones sin ningún canal");
    let playListData = playList.getPlayListData();
    if(playListData.length == 0)return message.channel.send("No hay canciones puestas");
    playListData[2].loop = !playListData[2].loop;
    if(playListData[2].loop === true) {
      play(playListData[0], playListData[1],playListData[2],playListData[3]);
      message.channel.send("Bucle activado");
    } else {
      playListData[2].songs.shift();
      playList.setPlayListData(playListData[0], playListData[1],playListData[2],playListData[3],)  
      message.channel.send("Bucle desactivado");
    }
  } else {
    message.channel.send("No hay una lista establecida");
  }
}

function play(guild, song, queueContruct, queue) {
  playListUpdate = playList.getPlayListData();
    if (!song) {
        queueContruct.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    
    let dispatcher = playListUpdate[2].connection
        .play(ytdl(song.url))
        .on("finish", () => {
          if(queueContruct.loop === true){
            let playListUpdate = playList.getPlayListData();
            playListUpdate[1].songs.push(playListUpdate[1].songs.shift());
            play( playListUpdate[0], playListUpdate[1].songs[0], playListUpdate[2],  playListUpdate[3]);
          } else {
            playListUpdate[1].songs.shift();
            play( playListUpdate[0], playListUpdate[1].songs[0], playListUpdate[2],  playListUpdate[3]);
          }
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(queueContruct.volume / 5);
    playListUpdate[2].textChannel.send(`Ahora está sonando: **${song.title}**`);
}