const BaseClient = require("../Base/Client.js");
const Command = require("../Base/Command.js").default;

module.exports = class PingCommand extends Command {

    constructor() {
        super({
            name: "mine",
            description: "Mine a block at a coord.",
            usage: "{{prefix}}mine",
        });
    }

    /**
     * 
     * @param {BaseClient} client 
     * @param {String} message 
     * @param {Array<String>} args 
     */
    run(client, message, args) {
        if (args.length < 3) return client.log("Plaese specify a coord.");
        const x = Number(args[0]);
        const y = Number(args[1]);
        const z = Number(args[2]);
        client.log(`Mining at ${x}, ${y}, ${z}`);
        if (args.includes("con")) {
            for (let i = Player.getPlayer().getMainHand().getDamage(); i < Player.getPlayer().getMainHand().getMaxDamage(); i = Player.getPlayer().getMainHand().getDamage()) {
                // Time.sleep(10);
                if (Player.getPlayer().getMainHand().getItemId().includes("netherrite") && Player.getPlayer().getMainHand().getDamage() <= 200) return;
                // if (World.getBlock(x, y, z).getId() !== "minecraft:air");
                destroyBlock(x, y, z);
            }
        } else {
            destroyBlock(x, y, z);
        }
    }
};

function destroyBlock(x, y, z) {
    // field_12968 START_DESTROY_BLOCK
    // field_12971 ABORT_DESTROY_BLOCK
    // field_12973 STOP_DESTROY_BLOCK
    // field_12970 DROP_ALL_ITEMS
    // field_12975 DROP_ITEM
    // field_12974 RELEASE_USE_ITEM
    // field_12969 SWAP_ITEM_WITH_OFFHAND
    let MinecraftClient = Client.getMinecraft();
    let PlayerActionC2SPacketAction = Reflection.getClass("net.minecraft.class_2846$class_2847");
    let startBreakAction = Reflection.getDeclaredField(PlayerActionC2SPacketAction, "field_12968").get(PlayerActionC2SPacketAction);
    let stopBreakAction = Reflection.getDeclaredField(PlayerActionC2SPacketAction, "field_12973").get(PlayerActionC2SPacketAction);
    let BlockPos = Reflection.getClass("net.minecraft.class_2338");
    let Direction = Reflection.getClass("net.minecraft.class_2350");
    let Facing = Reflection.getDeclaredField(Direction, "field_11033").get(Direction);
    let PlayerActionC2SPacket = Reflection.getClass("net.minecraft.class_2846");
    let block = new BlockPos(x, y, z);
    let startBreakPacket = new PlayerActionC2SPacket(startBreakAction, block, Facing);
    let stopBreakPacket = new PlayerActionC2SPacket(stopBreakAction, block, Facing);
    MinecraftClient.method_1562().method_2883(startBreakPacket);
    // Time.sleep(1);
    MinecraftClient.method_1562().method_2883(stopBreakPacket);
    // JsMacros.once("BlockUpdate", JavaWrapper.methodToJava((event) => {
    //     if (event.block.getX() === x && event.block.getY() === y && event.block.getZ() === z) {
    //         return;
    //     };
    // }));
};