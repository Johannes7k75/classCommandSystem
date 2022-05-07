const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class BreedCommand extends Command {

    constructor() {
        super({
            name: "log",
            description: "logs your input.",
            usage: "log <args>"
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        client.log(args.join(" "));
    }
};