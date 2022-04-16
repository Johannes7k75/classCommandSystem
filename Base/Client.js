module.exports = class ChatCommander {
    constructor(options) {
        this.prefix = options.config.prefix || ".";
        this.chatPrefix = "[Chat]";
        this.config = options.config || JsMacros.open(__dirname + "/../../config.json") || ".";
        this.commands = new Map();
        this.aliases = new Map();
        // this.events = new Map();
        // this.loadCommands = this.loadCommands.bind(this);
        // return this;
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
                        if (eventName.toLowerCase().includes("message") && event.message.startsWith(this.prefix)) {
                            fakeEvent.putString("message", event.message);
                            fakeEvent.putObject("client", this);
                            JsMacros.runScript("chatCommands/events/" + file, fakeEvent);
                            event.message = "";
                        } else if (!eventName.toLowerCase().includes("message")) {
                            JsMacros.runScript("chatCommands/events/" + file, event);
                        }
                    })
                );
            }
        }
        this.log("Loaded", size, "events.");
    }

    /**
     * 
     * @param {String} args 
     */
    log(...args) {
        Chat.log(Chat.createTextBuilder().append(this.chatPrefix).withColor(0xc).append(" ").append(args.join(" ")).build());
    }
};