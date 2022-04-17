const Client = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class BreedCommand extends Command {

    constructor() {
        super({
            name: "breed",
            description: "Breed a entity.",
            usage: "breed <entity>"
        });
    }

    /**
     * 
     * @param {Client} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        if (args.length < 1) return;

        const entities = World.getEntities();

        for (let entity of entities) {
            if (entity.getType().toLowerCase().includes(args[0].toLowerCase())) {
                Player.getPlayer().interactEntity(entity, false);
                client.log(`${entity.getName().getString()} has been bred!`);
            }
        }
    }
};