import { world, system, EquipmentSlot } from "@minecraft/server";

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        const equipment = player.getComponent("minecraft:equippable");
        if (equipment) {
            const mainHandItem = equipment.getEquipment(EquipmentSlot.Mainhand);      
            if (mainHandItem?.hasComponent("minecraft:durability")) {
                const durability = mainHandItem.getComponent("minecraft:durability");         
                const maxDurability = durability.maxDurability;
                const currentDurability = maxDurability - durability.damage;
                const loreMessage = `§r§7Durability: ${getDurabilityColor(currentDurability, maxDurability)}${currentDurability}§r§7 / ${maxDurability}`;
                const currentLore = mainHandItem.getLore();
                if (currentLore.length === 0 || currentLore[0] !== loreMessage) {
                    mainHandItem.setLore([loreMessage]);
                    equipment.setEquipment(EquipmentSlot.Mainhand, mainHandItem);
                }
            }
	}
    }
// 20 ticks per second, so this is every 1 second
}, 20);

function getDurabilityColor(current, max) {
    const percentage = current / max;
    if (percentage <= 0.2) return "§c";
    if (percentage <= 0.5) return "§e";
    return "§a";
}
