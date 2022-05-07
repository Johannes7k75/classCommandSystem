const message = event.getString("message");
const client = event.getObject("client");

if (message.toLowerCase().startsWith(client.prefix)) {
    let args = message.toLowerCase().slice(client.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd) || client.aliases.get(cmd);

    for (let arg of args) {
        if (client.vars.get(arg)) {
            args[args.indexOf(arg)] = client.vars.get(arg);
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

