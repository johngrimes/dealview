// @flow

import _ from 'lodash'
import type { Reducer, State, Action } from 'redux'

import type { AssetMap } from '../data/assets/asset.js'
import type { AssetAction } from '../actions/assets.js'

export type AssetState = {
  status: 'uninitialised'|'loading'|'loaded'|'error',
  error?: string,
  objects: AssetMap
}
const initialState: AssetState = {
  status: 'uninitialised',
  objects: {}
}

const AssetsReducer: Reducer<State, Action> = (state = initialState, action: AssetAction) => {
  switch (action.type) {
    case ('PUT_ASSET_REQUEST' || 'DELETE_ASSET_REQUEST' || 'LOAD_ASSET_REQUEST'):
      return {
        ...state,
        status: 'loading'
      }
    case 'PUT_ASSET_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        objects: { ...state.objects, [action.asset.id]: action.asset }
      }
    case 'DELETE_ASSET_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        objects: _.omit(state.objects, action.id)
      }
    case 'LOAD_ASSET_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        objects: action.assets
      }
    case ('PUT_ASSET_FAILURE' || 'DELETE_ASSET_FAILURE' || 'LOAD_ASSET_FAILURE'):
      return {
        ...state,
        status: 'error',
        error: action.error
      }
    default:
      return state
  }
}

export default AssetsReducer
