type EventListener = (eventType: string, content: Object) => void

class EventPublisher {
  subscribe: (eventType: string, listener: EventListener) => boolean
  publish: (eventType: string, content: Object) => boolean

  constructor() {
    let subscribers: { [eventType: string]: EventListener[] } = {}

    this.subscribe = (eventType, listener) => {
      if (!subscribers[eventType]) subscribers[eventType] = []
      subscribers[eventType].push(listener)
      return true
    }

    this.publish = (eventType, content) => {
      if (subscribers[eventType]) {
        for (const listener of subscribers[eventType]) {
          listener(eventType, content)
        }
      }
      for (const listener of subscribers['*']) {
        listener(eventType, content)
      }
      return true
    }
  }
}

export default EventPublisher
