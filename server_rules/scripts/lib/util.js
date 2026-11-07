import { system } from '@minecraft/server'

export function run(fn) {
  system.run(() => {
    try {
      fn()
    } catch(e) {
      console.error(`Error: ${e}`)
    }
  })
}

export function runTimeout(fn, timeout) {
  system.runTimeout(() => {
    try {
      fn()
    } catch(e) {
      console.warn(`Error: ${e}`)
    }
  }, timeout)
}
