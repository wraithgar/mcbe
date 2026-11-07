import {
  EntityComponentTypes,
  EquipmentSlot,
  ItemComponentTypes,
  world,
} from '@minecraft/server'

import { COLORS, EQUIPMENT_SLOTS } from './lib/constants.js'
import { run, runInterval, durabilityColor } from './lib/util.js'

world.afterEvents.blockContainerOpened.subscribe(({ block }) => {
  run(() => updateAllInventory(block))
}, {
  accessSourceFilter: {
    type: 'minecraft:player'
  }
})

world.afterEvents.entityContainerOpened.subscribe(({ entity }) => {
  run(() => updateAllInventory(entity))
}, {
  accessSourceFilter: {
    type: 'minecraft:player'
  }
})

world.afterEvents.playerInventoryItemChange.subscribe(({ player, slot }) => {
  run(() => updateContainerSlot(player, slot))
}, {
  ignoreQuantityChange: true,
})

world.afterEvents.playerBreakBlock.subscribe(({ player }) => {
  run(() => updateHeldItem(player))
})

world.afterEvents.itemUse.subscribe(({ source: player }) => {
  run(() => updateHeldItem(player))
})

world.afterEvents.entityHitEntity.subscribe(({ damagingEntity: player }) => {
  run(() => updateHeldItem(player))
}, {
  entityTypes: ['minecraft:player']
})

world.afterEvents.entityHurt.subscribe(({ hurtEntity: player }) => {
  run(() => updateEquipment(player))
}, {
  entityTypes: ['minecraft:player']
})

// Elytra, sigh.
// Runs every 2 seconds since you have to open your inventory to even look at equipped elytra, no need for anything more frequent
runInterval(() => updateEquippedChests(), 40)

function updateEquippedChests() {
  for (const player of world.getAllPlayers()) {
    updateSlot(getEquippable(player)?.getEquipmentSlot(EquipmentSlot.Chest))
  }
}

function updateEquipment(player) {
  const equippable = getEquippable(player)
  if (equippable) {
    for (const slotName of EQUIPMENT_SLOTS) {
      try {
        updateSlot(equippable.getEquipmentSlot(EquipmentSlot.Head))
        updateSlot(equippable.getEquipmentSlot(EquipmentSlot.Chest))
        updateSlot(equippable.getEquipmentSlot(EquipmentSlot.Legs))
        updateSlot(equippable.getEquipmentSlot(EquipmentSlot.Feet))
        updateSlot(equippable.getEquipmentSlot(EquipmentSlot.Offhand))
      } catch {}
    }
  }
}

function updateHeldItem(entity) {
  updateContainerSlot(entity, entity.selectedSlotIndex)
}

function updateContainerSlot(entity, index) {
  if (index < 0) {
    return
  }
  const container = getInventoryContainer(entity)
  if (index >= container.size) {
    return
  }
  updateSlot(container.getSlot(index))
}

function updateSlot(slot) {
  if (!slot?.hasItem()) {
    return
  }
  const item = slot.getItem()
  if (!item.hasComponent(ItemComponentTypes.Durability)) {
    return
  }
  const { maxDurability: max, damage } = item.getComponent(ItemComponentTypes.Durability)
  const remaining = max - damage
  const color = durabilityColor(remaining, max)
  const prefix = `${COLORS.reset}${COLORS.gray}Durability: `
  const message = `${prefix}${color}${remaining}${COLORS.gray} / ${max}`
  const lore = item.getLore()
  for (const i in lore) {
    if (lore[i].startsWith(prefix)) {
      if (lore[i] !== message) {
        lore[i] = message
        slot.setLore(lore)
      }
      return
    }
  }
  lore.push(message)
  slot.setLore(lore)
}

function getInventoryContainer(entity) {
  try {
    return entity.getComponent(EntityComponentTypes.Inventory)?.container
  } catch {}
}

function getEquippable(entity) {
  try {
    return entity.getComponent(EntityComponentTypes.Equippable)
  } catch {}
}

function updateAllInventory(entity) {
  const container = getInventoryContainer(entity)
  for (let i = 0; i < container.size; i++) {
    updateSlot(container.getSlot(i))
  }
}
