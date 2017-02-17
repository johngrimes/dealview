// @flow

import { save } from '../database.js'

export const eventLogger = (eventType: string, content: Object): void => {
  const event = {
    type: eventType,
    content: content
  }
  save('Event', event).then((id) => {
    console.log('successful save', id)
  }).catch((error) => {
    console.log('save error', error)
  })
}
