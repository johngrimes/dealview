import { createObjectActions } from './objects.js'
import { invalidateBalanceSheet } from './balanceSheet.js'
import { putObject, deleteObject, getAllObjects } from '../data/db.js'

const objectStore = 'Asset'

const actions = createObjectActions('ASSET', 'ASSETS', 'Asset', 'Assets')

const putAsset = asset => {
  return dispatch => {
    dispatch(actions.putAssetRequest(asset))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, asset)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.putAssetSuccess(saved))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putAssetFailure(error.message))
        reject(error)
      }
    })
  }
}

const deleteAsset = id => {
  return dispatch => {
    dispatch(actions.deleteAssetRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const key = await deleteObject(objectStore, id)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.deleteAssetSuccess(key))
        resolve(key)
      } catch (error) {
        dispatch(actions.deleteAssetFailure(error.message))
        reject(error)
      }
    })
  }
}

const loadAssets = () => {
  return dispatch => {
    dispatch(actions.loadAssetsRequest())
    return new Promise(async (resolve, reject) => {
      try {
        const assets = await getAllObjects(objectStore)
        dispatch(actions.loadAssetsSuccess(assets))
        resolve(assets)
      } catch (error) {
        dispatch(actions.loadAssetsFailure(error.message))
        reject(error)
      }
    })
  }
}

export default {
  ...actions,
  putAsset,
  deleteAsset,
  loadAssets,
}
