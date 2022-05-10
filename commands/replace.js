const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class BreedCommand extends Command {

    constructor() {
        super({
            name: "replace",
            description: "Replace block x with that what you hold.",
            usage: "replace <block>"
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        client.log(`${args[0]}`);
        if (!args[0]) return client.log("No block given.", "error");

        for (let x = -8; x < 8; x++) {
            for (let y = -8; y < 8; y++) {
                for (let z = -8; z < 8; z++) {
                    const block = World.getBlock(Math.floor(x + Player.getPlayer().getX()), Math.floor(y + Player.getPlayer().getY()), Math.floor(z + Player.getPlayer().getZ()));
                    if (block.getId().replace("minecraft:", "") === args[0]) {
                        if (Player.getPlayer().getMainHand().getCount() <= 0) continue;
                        if (args[1] === "source" || args[1] === "s" && block.getId().replace("minecraft:", "") === ("water" || "lava")) {
                            if (block.getBlockState().get("level") == 0) {
                                Player.getPlayer().interactBlock(Math.floor(x + Player.getPlayer().getX()), Math.floor(y + Player.getPlayer().getY()), Math.floor(z + Player.getPlayer().getZ()), 0, false);
                            } else {
                                client.log("No block to replace.", "error");
                                continue;
                            }
                        } else {
                            Player.getPlayer().interactBlock(Math.floor(x + Player.getPlayer().getX()), Math.floor(y + Player.getPlayer().getY()), Math.floor(z + Player.getPlayer().getZ()), 0, false);
                        }
                    }
                }
            }
        }
    }
};