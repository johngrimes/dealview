// @flow

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
