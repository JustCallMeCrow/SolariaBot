module.exports = {
    name: 'help',
    description: "Informa sobre los comandos",
    execute(message, fs) {
        let str = 'Estos son mis comandos y su información: \n';
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            str += `**Nombre:** ${command.name} --- **Description:** ${command.description} \n`;
        }

        message.channel.send(str);
    }
}