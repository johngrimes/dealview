// @flow

import { getDatabase } from '../data/database.js'
import type { Asset, AssetWithId, AssetMap } from '../data/assets/asset.js'
import type { Thunk } from '../data/commonTypes.js'

const objectStore = 'Asset'

type PutAssetRequestAction = {
  type: 'PUT_ASSET_REQUEST'
}
type PutAssetSuccessAction = {
  type: 'PUT_ASSET_SUCCESS',
  asset: AssetWithId
}
type PutAssetFailureAction = {
  type: 'PUT_ASSET_FAILURE',
  error: string|null
}

type DeleteAssetRequestAction = {
  type: 'DELETE_ASSET_REQUEST'
}
type DeleteAssetSuccessAction = {
  type: 'DELETE_ASSET_SUCCESS',
  id: string
}
type DeleteAssetFailureAction = {
  type: 'DELETE_ASSET_FAILURE',
  error: string|null
}

type LoadAssetRequestAction = {
  type: 'LOAD_ASSET_REQUEST'
}
type LoadAssetSuccessAction = {
  type: 'LOAD_ASSET_SUCCESS',
  assets: AssetMap
}
type LoadAssetFailureAction = {
  type: 'LOAD_ASSET_FAILURE',
  error: string|null
}

export type AssetAction = PutAssetRequestAction
                        | PutAssetSuccessAction
                        | PutAssetFailureAction
                        | DeleteAssetRequestAction
                        | DeleteAssetRequestAction
                        | DeleteAssetFailureAction
                        | LoadAssetRequestAction
                        | LoadAssetSuccessAction
                        | LoadAssetFailureAction

export const putAssetRequest = (): PutAssetRequestAction => {
  return { type: 'PUT_ASSET_REQUEST' }
}

export const putAssetSuccess = (asset: AssetWithId): PutAssetSuccessAction => {
  return {
    type: 'PUT_ASSET_SUCCESS',
    asset
  }
}

export const putAssetFailure = (error: string|null): PutAssetFailureAction => {
  return {
    type: 'PUT_ASSET_FAILURE',
    error
  }
}

export const deleteAssetRequest = (): DeleteAssetRequestAction => {
  return { type: 'DELETE_ASSET_REQUEST' }
}

export const deleteAssetSuccess = (id: string): DeleteAssetSuccessAction => {
  return {
    type: 'DELETE_ASSET_SUCCESS',
    id
  }
}

export const deleteAssetFailure = (error: string|null): DeleteAssetFailureAction => {
  return {
    type: 'DELETE_ASSET_FAILURE',
    error
  }
}

export const loadAssetRequest = (): LoadAssetRequestAction => {
  return { type: 'LOAD_ASSET_REQUEST' }
}

export const loadAssetSuccess = (assets: AssetMap): LoadAssetSuccessAction => {
  return {
    type: 'LOAD_ASSET_SUCCESS',
    assets
  }
}

export const loadAssetFailure = (error: string|null): LoadAssetFailureAction => {
  return {
    type: 'LOAD_ASSET_FAILURE',
    error
  }
}

export const putAsset = (asset: Asset): Thunk => {
  return dispatch => {
    dispatch(putAssetRequest)
    return new Promise((resolve, reject) => {
      getDatabase().then(db => {
        const transaction = db.transaction([objectStore], 'readwrite')
        const store = transaction.objectStore(objectStore)
        if (!asset.id) { delete asset.id }
        const request = store.put(asset)
        request.onsuccess = event => {
          const saved = { ...asset, id: event.target.result }
          dispatch(putAssetSuccess(saved))
          resolve(saved)
        }
        request.onerror = () => {
          dispatch(putAssetFailure(typeof request.error === 'string' ? request.error : null))
          reject(request.error)
        }
      }).catch(error => {
        dispatch(putAssetFailure(error))
        reject(error)
      })
    })
  }
}

export const deleteAsset = (id: string): Thunk => {
  return dispatch => {
    dispatch(deleteAssetRequest)
    return new Promise((resolve, reject) => {
      getDatabase().then(db => {
        const transaction = db.transaction([objectStore], 'readwrite')
        const store = transaction.objectStore(objectStore)
        const request = store.delete(id)
        request.onsuccess = event => {
          dispatch(deleteAssetSuccess(id))
          resolve(id)
        }
        request.onerror = () => {
          dispatch(deleteAssetFailure(typeof request.error === 'string' ? request.error : null))
          reject(request.error)
        }
      }).catch(error => {
        dispatch(deleteAssetFailure(error))
        reject(error)
      })
    })
  }
}

export const loadAssets = (): Thunk => {
  return dispatch => {
    dispatch(loadAssetRequest())
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
            dispatch(loadAssetSuccess(objects))
            resolve(objects)
          }
        }
        request.onerror = () => {
          dispatch(loadAssetFailure(typeof request.error === 'string' ? request.error : null))
          reject(request.error)
        }
      }).catch(error => {
        dispatch(loadAssetFailure(error))
        reject(error)
      })
    })
  }
}
