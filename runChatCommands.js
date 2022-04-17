const reverse = !GlobalVars.getBoolean("ToggleChatCommands");
const chatCommands = GlobalVars.getObject("ChatCommandsCtx");
GlobalVars.putBoolean("ToggleChatCommands", reverse);
if (reverse) {
    // If true   
    GlobalVars.putObject("ChatCommandsCtx", JsMacros.runScript(__dirname + "/ChatCommands.js").getCtx());
    JsMacros.once("Disconnect", JavaWrapper.methodToJava(() => {
        GlobalVars.getObject("ChatCommandsCtx").closeContext();
    }));
}
// else {
//     // If false
//     Chat.log("ChatCommands disabled");
//     GlobalVars.getObject("ChatCommandsCtx").closeContext();
// }