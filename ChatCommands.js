const Client = require("./Base/Client.js");

const client = new Client({ config: "./config.json" });

client.loadCommands();
client.loadEvents();

client.log("Client loaded");