// @flow

import { putObject, deleteObject, getAllObjects } from 'data/database'
import type { Asset, AssetWithId, AssetMap } from 'data/assets/asset'
import type { Thunk } from 'data/commonTypes'

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

type LoadAssetsRequestAction = {
  type: 'LOAD_ASSETS_REQUEST'
}
type LoadAssetsSuccessAction = {
  type: 'LOAD_ASSETS_SUCCESS',
  assets: AssetMap
}
type LoadAssetsFailureAction = {
  type: 'LOAD_ASSETS_FAILURE',
  error: string|null
}

export type AssetAction = PutAssetRequestAction
                        | PutAssetSuccessAction
                        | PutAssetFailureAction
                        | DeleteAssetRequestAction
                        | DeleteAssetRequestAction
                        | DeleteAssetFailureAction
                        | LoadAssetsRequestAction
                        | LoadAssetsSuccessAction
                        | LoadAssetsFailureAction

export const putAssetRequest = (): PutAssetRequestAction => {
  return { type: 'PUT_ASSET_REQUEST' }
}

export const putAssetSuccess = (asset: AssetWithId): PutAssetSuccessAction => {
  return {
    type: 'PUT_ASSET_SUCCESS',
    asset,
  }
}

export const putAssetFailure = (error: string|null): PutAssetFailureAction => {
  return {
    type: 'PUT_ASSET_FAILURE',
    error,
  }
}

export const deleteAssetRequest = (): DeleteAssetRequestAction => {
  return { type: 'DELETE_ASSET_REQUEST' }
}

export const deleteAssetSuccess = (id: string): DeleteAssetSuccessAction => {
  return {
    type: 'DELETE_ASSET_SUCCESS',
    id,
  }
}

export const deleteAssetFailure = (error: string|null): DeleteAssetFailureAction => {
  return {
    type: 'DELETE_ASSET_FAILURE',
    error,
  }
}

export const loadAssetsRequest = (): LoadAssetsRequestAction => {
  return { type: 'LOAD_ASSETS_REQUEST' }
}

export const loadAssetsSuccess = (assets: AssetMap): LoadAssetsSuccessAction => {
  return {
    type: 'LOAD_ASSETS_SUCCESS',
    assets,
  }
}

export const loadAssetsFailure = (error: string|null): LoadAssetsFailureAction => {
  return {
    type: 'LOAD_ASSETS_FAILURE',
    error,
  }
}

export const putAsset = (asset: Asset): Thunk => {
  return dispatch => {
    dispatch(putAssetRequest())
    return new Promise((resolve, reject) => {
      putObject(objectStore, asset).then(saved => {
        dispatch(putAssetSuccess(saved))
        resolve(saved)
      }).catch(error => {
        dispatch(putAssetFailure(error))
        reject(error)
      })
    })
  }
}

export const deleteAsset = (id: string): Thunk => {
  return dispatch => {
    dispatch(deleteAssetRequest())
    return new Promise((resolve, reject) => {
      deleteObject(objectStore, id).then(key => {
        dispatch(deleteAssetSuccess(key))
        resolve(key)
      }).catch(error => {
        dispatch(deleteAssetFailure(error))
        reject(error)
      })
    })
  }
}

export const loadAssets = (): Thunk => {
  return dispatch => {
    dispatch(loadAssetsRequest())
    return new Promise((resolve, reject) => {
      getAllObjects(objectStore).then(assets => {
        dispatch(loadAssetsSuccess(assets))
        resolve(assets)
      }).catch(error => {
        dispatch(loadAssetsFailure(error))
        reject(error)
      })
    })
  }
}
