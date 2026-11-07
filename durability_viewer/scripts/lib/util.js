import { system } from '@minecraft/server'
import { COLORS } from './constants.js'

export function run(fn) {
  system.run(() => {
    try {
      fn()
    } catch(e) {
      console.warn(`Error: ${e}`)
    }
  })
}

export function runInterval(fn, interval) {
  system.runInterval(() => {
    try {
      fn()
    } catch(e) {
      console.warn(`Error: ${e}`)
    }
  }, interval)
}

export function durabilityColor(current, max) {
  const percentage = current / max
  if (percentage <= 0.2) {
    return COLORS.red
  }
  if (percentage <= 0.5) {
    return COLORS.yellow
  }
  return COLORS.green
}
