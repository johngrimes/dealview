// @flow

import { putObject, deleteObject, getAllObjects } from 'db/db'
import { invalidateBalanceSheet } from 'actions/balanceSheet'
import { createObjectActions } from 'actions/objects'
import type { Asset } from 'types/assets/asset'
import type { Thunk } from 'types/commonTypes'

const objectStore = 'Asset'

const actions = createObjectActions('ASSET', 'ASSETS',
                                    'Asset', 'Assets')

const putAsset = (asset: Asset): Thunk => {
  return dispatch => {
    dispatch(actions.putAssetRequest(asset))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, asset)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.putAssetSuccess(saved))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putAssetFailure(error))
        reject(error)
      }
    })
  }
}

const deleteAsset = (id: string): Thunk => {
  return dispatch => {
    dispatch(actions.deleteAssetRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const key = await deleteObject(objectStore, id)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.deleteAssetSuccess(key))
        resolve(key)
      } catch (error) {
        dispatch(actions.deleteAssetFailure(error))
        reject(error)
      }
    })
  }
}

const loadAssets = (): Thunk => {
  return dispatch => {
    dispatch(actions.loadAssetsRequest())
    return new Promise(async (resolve, reject) => {
      try {
        const assets = await getAllObjects(objectStore)
        dispatch(actions.loadAssetsSuccess(assets))
        resolve(assets)
      } catch (error) {
        dispatch(actions.loadAssetsFailure(error))
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
