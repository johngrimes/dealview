// @flow

import { putObject, deleteObject, getAllObjects } from 'db/db'
import { invalidateBalanceSheet } from 'actions/balanceSheet'
import type { Asset, AssetWithId, AssetMap } from 'types/assets/asset'
import type { Thunk } from 'types/commonTypes'

const objectStore = 'Asset'

type PutAssetRequestAction = {
  type: 'PUT_ASSET_REQUEST',
  asset: Asset,
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
  type: 'DELETE_ASSET_REQUEST',
  id: string,
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

export const putAssetRequest = (asset: Asset): PutAssetRequestAction => {
  return {
    type: 'PUT_ASSET_REQUEST',
    asset,
  }
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

export const deleteAssetRequest = (id: string): DeleteAssetRequestAction => {
  return {
    type: 'DELETE_ASSET_REQUEST',
    id,
  }
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
    dispatch(putAssetRequest(asset))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, asset)
        dispatch(invalidateBalanceSheet())
        dispatch(putAssetSuccess(saved))
        resolve(saved)
      } catch (error) {
        dispatch(putAssetFailure(error))
        reject(error)
      }
    })
  }
}

export const deleteAsset = (id: string): Thunk => {
  return dispatch => {
    dispatch(deleteAssetRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const key = await deleteObject(objectStore, id)
        dispatch(invalidateBalanceSheet())
        dispatch(deleteAssetSuccess(key))
        resolve(key)
      } catch (error) {
        dispatch(deleteAssetFailure(error))
        reject(error)
      }
    })
  }
}

export const loadAssets = (): Thunk => {
  return dispatch => {
    dispatch(loadAssetsRequest())
    return new Promise(async (resolve, reject) => {
      try {
        const assets = await getAllObjects(objectStore)
        dispatch(loadAssetsSuccess(assets))
        resolve(assets)
      } catch (error) {
        dispatch(loadAssetsFailure(error))
        reject(error)
      }
    })
  }
}
