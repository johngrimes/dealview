// @flow

import type { Asset, AssetWithId, AssetMap } from 'types/assets/asset'

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
