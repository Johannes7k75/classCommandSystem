const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class BreedCommand extends Command {

    constructor() {
        super({
            name: "findblock",
            description: "find a block in your surrounding.",
            usage: "findblock <block>"
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        const overlay = Hud.createDraw3D();
        client.log(`${args[0]}`);
        if (!args[0]) return client.log("No block given.", "error");

        const markedBlocks = World.findBlocksMatching(args[0], 3);
        // client.log(markedBlocks, "info");
        for (let block of markedBlocks) {
            let [blockPosX, blockPosY, blockPosZ] = [block.getX(), block.getY(), block.getZ()];
            overlay.addBox(blockPosX, blockPosY, blockPosZ, blockPosX + 1, blockPosY + 1, blockPosZ + 1, 0xFF0000, 0xFF0000, true);
        }

        overlay.register();
    }
};