const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class BreedCommand extends Command {

    constructor() {
        super({
            name: "clear",
            description: "clear a 2d elements or 3d elements.",
            usage: "clear <2|3>"
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        if (args.length < 1) {
            Hud.clearDraw2Ds();
            Hud.clearDraw3Ds();
        }

        if (args[0] == "2") {
            Hud.clearDraw2Ds();
        } else if (args[0] == "3") {
            Hud.clearDraw3Ds();
        }
    }
};