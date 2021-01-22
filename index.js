const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = "Solaria ";

const fs = require('fs');

const queue = new Map();

let http = require('http');  

http.createServer(function (req, res) {   
  res.write("Solaria On-Line");   
  res.end(); 
}).listen(8080);

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('¡Solaria lista para el servicio!');
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.chache.find(ch => ch.name === 'logs');
    if (!channel) return;
    channel.send(`Te doy la bienvenida ${message.author}, ¿En qué puedo servirte?`);

});

client.on('message', message => {
    if (message.content == "Solaria") message.channel.send("Dime bebe :3, esperando ordenes");

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (message.content.includes("fea") || message.content.includes("puta") || message.content.includes("zorra" || mesage.content.includes("gorda") || mesage.content.includes("muerete"))) {
        let frases = require('./frases/recibeInsultos.js');
        message.channel.send(frases[0][(parseInt(Math.random() * frases[0].length))]);
    } else {

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if (command === 'hola') {
            client.commands.get('hola').execute(message, args);
        } else if (command == 'crow') {
            client.commands.get('crow').execute(message, args);
        } else if (command == 'help') {
            client.commands.get('help').execute(message, fs);
        } else if (command == 'khan') {
            client.commands.get('khan').execute(message, args);
        } else if (command == 'bukuku') {
            client.commands.get('bukuku').execute(message, args);
        } else if (command == 'conquistador') {
            client.commands.get('conquistador').execute(message, args);
        } else if (command == 'sergivs') {
            client.commands.get('sergivs').execute(message, args);
        } else if (command == 'alifa') {
            client.commands.get('alifa').execute(message, args);
        } else if (command == 'yese') {
            client.commands.get('yese').execute(message, args);
        } else if (command == 'neverlands') {
            client.commands.get('neverlands').execute(message, args);
        } else if (command == 'lissalde') {
            client.commands.get('lissalde').execute(message, args);
        } else if (command == 'saurian') {
            client.commands.get('saurian').execute(message, args);
        } else if (command == 'rene') {
            client.commands.get('rene').execute(message, args);
        } else if (command == 'larax') {
            client.commands.get('larax').execute(message, args);
        } else if (command == 'fotos') {
            client.commands.get('fotos').execute(message, args);
        } else if (command == 'recordatorio') {
            client.commands.get('recodatorio').execute(message, args);
        } else if (command == 'dados') {
            client.commands.get('dados').execute(message, args);
        } else if (command == 'play') {
            client.commands.get('play').execute(message, args, queue);
        } else if (command == 'skip') {
            client.commands.get('skip').execute(message, args, queue);
        } else if (command == 'stop') {
            client.commands.get('stop').execute(message, args, queue);
        } else if (command == 'guapa') {
            client.commands.get('guapa').execute(message, args);
        } else {
            message.channel.send("Erm, no puedo hacerlo o te has equivocado, lo siento, le diré a Crow que me mejore");
        }
    }
});

client.login(process.env.BOTTOKEN);