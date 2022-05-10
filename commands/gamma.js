// const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class GammaCommand extends Command {

    constructor() {
        super({
            name: "gamma",
            description: "sets your gamma value.",
            usage: "gamma <value>"
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        if (!args[0]) {
            Client.getGameOptions().setGamma(1.0);
            return;
        }
        if (args[0]) {
            Client.getGameOptions().setGamma(Number(args[0]));
        }
    }
};