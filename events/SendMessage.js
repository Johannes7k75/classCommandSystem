const message = event.getString("message");
const client = event.getObject("client");
const chatVarPrefix = "$$";

if (message.toLowerCase().startsWith(client.prefix)) {
    let args = message.toLowerCase().slice(client.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd) || client.aliases.get(cmd);

    for (let arg of args) {
        if (arg.startsWith(chatVarPrefix) && client.vars.get(arg.replace(chatVarPrefix, ""))) {
            args[args.indexOf(arg)] = client.vars.get(arg.replace(chatVarPrefix, ""));
        }
        if (arg.startsWith(chatVarPrefix) && arg.replace(chatVarPrefix, "") === ("curpos" || "curposr")) {
            args[args.indexOf(arg)] = arg.replace(chatVarPrefix, "") === "curposr" ? `${Math.floor(Player.getPlayer().getX())}, ${Math.floor(Player.getPlayer().getY())}, ${Math.floor(Player.getPlayer().getZ())}` : Player.getPlayer().getPos().toString();
        }
    }

    if (Chat.getHistory().getSent().size() === 0 || Chat.getHistory().getSent().get(Chat.getHistory().getSent().size() - 1) !== event.getString("message")) {
        Chat.getHistory().getSent().add(event.getString("message"));
    }
    if (command) {
        client.log(cmd);
        let Command = require("../commands/" + command + ".js");
        let commandClass = new Command();
        commandClass.run(client, message, args);
    } else {
        Chat.say(message);
    }
}

