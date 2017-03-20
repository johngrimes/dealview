// @flow

export type Values = { [key: string]: any }

// eslint-disable-next-line no-unused-vars
export const getDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject('Browser does not appear to support IndexedDB.')
    }

    const request = window.indexedDB.open('DealView', 1)

    request.onsuccess = () => { resolve(request.result) }
    request.onerror = () => { reject(request.error) }
    request.onblocked = event => { reject('Database cannot be loaded as it is currently in use.') }
    request.onupgradeneeded = event => {
      const db = event.target.result
      if (!event.oldVersion || event.oldVersion < 1) {
        db.createObjectStore('Asset.RealEstate', { keyPath: 'id', autoIncrement: true })
        db.createObjectStore('Event', { keyPath: 'id', autoIncrement: true })
        const assetStore = db.createObjectStore('Asset', { keyPath: 'id', autoIncrement: true })
        assetStore.createIndex('type, instanceId', ['type', 'instanceId'])
      }
    }
  })
}

//
// Takes a set of values, and returns the ID of the new record.
//
export const save = (objectStore: string, values: Values): Promise<string> => {
  return new Promise((resolve, reject) => {
    getDatabase().then(db => {
      const transaction = db.transaction([objectStore], 'readwrite')
      const store = transaction.objectStore(objectStore)
      if (!values.id) { delete values.id }
      const request = store.put(values)
      request.onsuccess = event => { resolve(event.target.result) }
      request.onerror = () => { reject(request.error) }
    }).catch(error => { reject(error) })
  })
}

//
// Takes an ID, and returns the values of the matching record.
//
export const load = (objectStore: string, id: string): Promise<Values> => {
  return new Promise((resolve, reject) => {
    getDatabase().then(db => {
      const transaction = db.transaction([objectStore], 'readonly')
      const store = transaction.objectStore(objectStore)
      const request = store.get(parseInt(id))
      request.onsuccess = event => { resolve(event.target.result) }
      request.onerror = () => { reject(request.error) }
    }).catch(error => { reject(error) })
  })
}

//
// Loads all records from the specified object store.
//
export const loadAll = (objectStore: string): Promise<Values[]> => {
  return new Promise((resolve, reject) => {
    getDatabase().then((db) => {
      const transaction = db.transaction([objectStore], 'readonly')
      const store = transaction.objectStore(objectStore)
      const records = []
      const request = store.openCursor()
      request.onsuccess = (event) => {
        const cursor = event.target.result
        if (cursor) {
          records.push(cursor.value)
          cursor.continue()
        } else {
          resolve(records)
        }
      }
      request.onerror = () => { reject(request.error) }
    }).catch(error => { reject(error) })
  })
}
