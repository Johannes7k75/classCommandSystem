const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class PingCommand extends Command {

    constructor() {
        super({
            name: "ping",
            description: "Sends a ping to the server.",
            usage: "{{prefix}}ping",
            aliases: ["p"],
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        Chat.log("Pong!" + "info");
        Time.sleep(1000);
        Chat.log("info");
    }
};