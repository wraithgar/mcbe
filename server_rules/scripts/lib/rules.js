import { ModalFormData } from '@minecraft/server-ui'
import { COLORS } from './constants.js'
import { runTimeout } from './util.js'

const title = `${COLORS.bold}Gar's Minecraft Zone!`
const header = `${COLORS.italic}The rules:`
const rules = [
  `:wood_sword: No Griefing`,
  ``,
  `:wood_pickaxe: No bad language`,
  ``,
  `:crafting_table: Don't take what's not yours`,
  ``,
  `There will be children on this server`,
  `Act kindly and be patient :heart:`,
]
const message = 'Respect the Chickens!'

export function showRules(player) {
  const modal = new ModalFormData()
  modal
    .title(title)
    .header(header)
    .label(rules.join('\n'))
    .submitButton('Agree')
    .show(player)
    .then(result => {
      if (result.formValues === undefined) {
        runTimeout(() => showRules(player), 10)
        return
      }
      player.sendMessage(message)
    }).catch(err => console.log(`Rules error: ${err.stack}`))
}
