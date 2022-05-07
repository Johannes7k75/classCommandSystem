const Client = require("./Base/Client.js");

const client = new Client({ config: "config.json" });
client.loadCommands();
client.loadEvents();

const vars = {
    c1x: -3848,
    c1y: -130,
    c1z: -7560,
};

client.setvars(vars);

client.log("Client loaded");