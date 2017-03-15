// @flow

import { save } from '../database.js'

export const eventLogger = (eventType: string, content: Object): void => {
  const event = {
    type: eventType,
    content: content
  }
  save('Event', event).catch((error) => {
    console.error('Event save error', error)
  })
}
