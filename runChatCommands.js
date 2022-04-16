const reverse = !GlobalVars.getBoolean("ToggleChatCommands");
const chatCommands = GlobalVars.getObject("ChatCommandsCtx");
GlobalVars.putBoolean("ToggleChatCommands", reverse);
if (reverse) {
    // If true   
    GlobalVars.putObject("ChatCommandsCtx", JsMacros.runScript("chatCommands/ChatCommands.js").getCtx());
} else {
    // If false
    Chat.log("ChatCommands disabled");
    GlobalVars.getObject("ChatCommandsCtx").closeContext();
}