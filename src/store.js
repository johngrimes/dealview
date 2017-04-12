// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import type { Store } from 'redux'

import AssetsReducer from './reducers/assets.js'
import RealEstateReducer from './reducers/realEstate.js'
import type { AssetState } from './reducers/assets.js'
import type { RealEstateState } from './reducers/realEstate.js'

export type GlobalState = {
  assets: AssetState,
  realEstate: RealEstateState
}

const configureStore = (initialState: GlobalState): Store => {
  const reducer = combineReducers({
    assets: AssetsReducer,
    realEstate: RealEstateReducer
  })
  return createStore(reducer, initialState, applyMiddleware(thunk, logger))
}

export default configureStore
