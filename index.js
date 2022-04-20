const reverse = !GlobalVars.getBoolean("ToggleChatCommands");
const chatCommands = GlobalVars.getObject("ChatCommandsCtx");
console.log(GlobalVars.getBoolean("ToggleChatCommands"));
GlobalVars.putBoolean("ToggleChatCommands", reverse);
if (reverse) {
    GlobalVars.putObject("ChatCommandsCtx", JsMacros.runScript(__dirname + "/ChatCommands.js").getCtx());
}
JsMacros.on("Disconnect", JavaWrapper.methodToJava(() => {
    GlobalVars.putBoolean("ToggleChatCommands", !GlobalVars.getBoolean("ToggleChatCommands"));
    GlobalVars.getObject("ChatCommandsCtx").closeContext();
}));