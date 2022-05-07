module.exports = class ChatCommander {
    constructor(options) {
        this.config = FS.exists(options.config) ? JSON.parse(FS.open(options.config).read()) : null;
        this.prefix = this.config !== null ? this.config.prefix ? this.config.prefix : "." : ".";
        this.chatPrefix = this.config !== null ? this.config.chatPrefix ? this.config.chatPrefix : "[Chat]" : "[Chat]";
        this.vars = new Map();
        this.commands = new Map();
        this.aliases = new Map();
    }

    loadCommands() {
        this.log("Loading commands...");
        let files = FS.list("commands");
        for (let file of files) {
            if (file.endsWith(".js")) {
                let Command = require("../commands/" + file);
                let command = new Command(this);
                this.commands[command.name] = command;
                this.commands.set(command.name, command.name);
                if (command.aliases) {
                    for (let alias of command.aliases) {
                        this.aliases.set(alias, command.name);
                    }
                }
            }
        }
        this.log("Loaded ", this.commands.size, "commands.");
    }

    loadEvents() {
        let size = 0;
        this.log("Loading events...");
        let files = FS.list("events");
        for (let file of files) {
            if (file.endsWith(".js")) {
                size++;
                let eventName = file.split(".")[0];
                let fakeEvent = JsMacros.createCustomEvent(eventName.toLowerCase() + "_event");
                JsMacros.on(eventName,
                    JavaWrapper.methodToJava((event) => {
                        if (eventName.toLowerCase().includes("sendmessage") && event.message.startsWith(this.prefix) && event.message.length > this.prefix.length) {
                            fakeEvent.putString("message", event.message);
                            fakeEvent.putObject("client", this);
                            JsMacros.runScript(__dirname + "/../events/" + file, fakeEvent);
                            event.message = "";
                        } else if (!eventName.toLowerCase().includes("message")) {
                            JsMacros.runScript(__dirname + "/../events/" + file, event);
                        }
                    })
                );
            }
        }
        this.log("Loaded", size, "events.");
    }

    /**
     * 
     * @param {Object} vars 
     */
    setvars(vars = {}) {
        for (let i = 0; i < Object.keys(vars).length; i++) {
            this.vars.set(Object.keys(vars)[i], vars[Object.keys(vars)[i]]);
        }
        this.log("Set", this.vars.size, "variables.");
    }

    /**
     * @param {String} args 
     */
    log(...args) {
        Chat.log(Chat.createTextBuilder().append(this.chatPrefix).withColor(0xc).append(" ").append(args.join(" ")).build());
    }
};