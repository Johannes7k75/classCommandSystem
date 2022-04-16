module.exports.default = class Command {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.usage = options.usage || "";
        this.aliases = options.aliases || [];
    }

    run(client, message, args) {
        Chat.log(`${this.name} has no run function.`);
    }
};