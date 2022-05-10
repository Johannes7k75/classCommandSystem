const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class InteractCommand extends Command {

    constructor() {
        super({
            name: "interact",
            description: "Interacts with things in your surrounding.",
            usage: "{{prefix}}interact",
            aliases: ["in"],
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        if (!args[0]) return client.log("No arguments were provided.", "error");
        const animal = args[0];

        const entities = World.getEntities();

        entities.forEach(entity => {
            if (entity.getType() === "minecraft:" + animal) {
                if (args.includes("right")) {
                    Player.getPlayer().interactEntity(entity, args.includes("off") ? true : false);
                } else {
                    Player.getPlayer().attack(entity);
                }
            }
        });
    }
};