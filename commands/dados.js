module.exports = {
    name: 'dados',
    description: "Tirador de dados",
    execute(message, args) {

        if (!args[0]) {
            message.channel.send('Tienes que introducir los dados con el formato: 1d6, por ejemplo, el primer número es la cantidad, el segundo el tamaño del dado');
        } else {

            let diceData = args[0].split("d");
            let rolls = new Array();
            let rollResult = "Tus tiradas han sido: ";
            let totalSum = 0;
            for (let i = 0; i < diceData[0]; i++) {
                rolls[i] = parseInt(Math.random() * diceData[1] + 1);
                totalSum += rolls[i];
                rollResult += (i != diceData[0] - 1) ? rolls[i] + ", " : rolls[i] + ".";
            }
            message.channel.send(rollResult + '\n' + "Total: " + totalSum + '\n' + "Soy rápida con los cálculos ¿Verdad?");
        }
    }
}