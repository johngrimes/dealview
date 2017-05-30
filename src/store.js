// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { applyWorker } from 'redux-worker'
import type { Store } from 'redux'

import combinedReducer from 'reducers/combined'
import type { AssetState } from 'reducers/assets'
import type { RealEstateState } from 'reducers/realEstate'
import type { BalanceSheetState } from 'reducers/balanceSheet'

export type GlobalState = {
  assets: AssetState,
  realEstate: RealEstateState,
  balanceSheet: BalanceSheetState
}

export type ObjectStoreStatus = 'uninitialised'|'loading'|'loaded'|'error'

const enhancer = compose(
  applyMiddleware(thunk, logger),
  applyWorker(new Worker('/static/js/worker.js'))
)

const configureStore = (initialState: GlobalState): Store => {
  return createStore(combinedReducer, initialState, enhancer)
}

export default configureStore
