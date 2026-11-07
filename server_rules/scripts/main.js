import { world } from '@minecraft/server'
import { showRules } from './lib/rules.js'
import { run } from './lib/util.js'

world.afterEvents.playerSpawn.subscribe(({ player }) => run(() => showRules(player)))
