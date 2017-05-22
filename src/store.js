// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import type { Store } from 'redux'

import AssetsReducer from 'reducers/assets'
import RealEstateReducer from 'reducers/realEstate'
import BalanceSheetReducer from 'reducers/balanceSheet'
import type { AssetState } from 'reducers/assets'
import type { RealEstateState } from 'reducers/realEstate'
import type { BalanceSheetState } from 'reducers/balanceSheet'

export type GlobalState = {
  assets: AssetState,
  realEstate: RealEstateState,
  balanceSheet: BalanceSheetState
}

export type ObjectStoreStatus = 'uninitialised'|'loading'|'loaded'|'error'

const configureStore = (initialState: GlobalState): Store => {
  const reducer = combineReducers({
    assets: AssetsReducer,
    realEstate: RealEstateReducer,
    balanceSheet: BalanceSheetReducer,
  })
  return createStore(reducer, initialState, applyMiddleware(thunk, logger))
}

export default configureStore
