// @flow

import { getDatabase } from '../data/database.js'
import type { Thunk, ObjectMap } from '../data/commonTypes.js'

export type ObjectStoreStatus = 'uninitialised'|'loading'|'loaded'|'error'

export const putObject = (objectStore: string,
                          object: Object,
                          requestAction: () => Object|Thunk,
                          successAction: (object: Object) => Object|Thunk,
                          failureAction: (error: string|null) => Object|Thunk)
                          : Thunk => {
  return dispatch => {
    dispatch(requestAction())
    return new Promise((resolve, reject) => {
      getDatabase().then(db => {
        const transaction = db.transaction([objectStore], 'readwrite')
        const store = transaction.objectStore(objectStore)
        const request = store.put(object)
        request.onsuccess = event => {
          const saved = { ...object, id: event.target.result }
          dispatch(successAction(saved))
          resolve(saved)
        }
        request.onerror = () => {
          dispatch(failureAction(typeof request.error === 'string' ? request.error : null))
          reject(request.error)
        }
      }).catch(error => {
        dispatch(failureAction(error))
        reject(error)
      })
    })
  }
}

export const deleteObject = (objectStore: string,
                             id: string,
                             requestAction: () => Object|Thunk,
                             successAction: (id: string) => Object|Thunk,
                             failureAction: (error: string|null) => Object|Thunk)
                             : Thunk => {
  return dispatch => {
    dispatch(requestAction())
    return new Promise((resolve, reject) => {
      getDatabase().then(db => {
        const transaction = db.transaction([objectStore], 'readwrite')
        const store = transaction.objectStore(objectStore)
        const request = store.delete(id)
        request.onsuccess = event => {
          dispatch(successAction(id))
          resolve(id)
        }
        request.onerror = () => {
          dispatch(failureAction(typeof request.error === 'string' ? request.error : null))
          reject(request.error)
        }
      }).catch(error => {
        dispatch(failureAction(error))
        reject(error)
      })
    })
  }
}

export const loadObjects = (objectStore: string,
                            requestAction: () => Object|Thunk,
                            successAction: (objects: ObjectMap) => Object|Thunk,
                            failureAction: (error: string|null) => Object|Thunk)
                            : Thunk => {
  return dispatch => {
    dispatch(requestAction())
    return new Promise((resolve, reject) => {
      getDatabase().then(db => {
        const transaction = db.transaction([objectStore], 'readonly')
        const store = transaction.objectStore(objectStore)
        const objects = {}
        const request = store.openCursor()
        request.onsuccess = event => {
          const cursor = event.target.result
          if (cursor) {
            objects[cursor.key] = cursor.value
            cursor.continue()
          } else {
            dispatch(successAction(objects))
            resolve(objects)
          }
        }
        request.onerror = () => {
          dispatch(failureAction(typeof request.error === 'string' ? request.error : null))
          reject(request.error)
        }
      }).catch(error => {
        dispatch(failureAction(error))
        reject(error)
      })
    })
  }
}
