// @flow

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import type { Store } from 'redux'

import combinedReducer from 'reducers/combined'
import type { AssetState } from 'reducers/assets'
import type { RealEstateState } from 'reducers/realEstate'
import type { BalanceSheetState } from 'reducers/balanceSheet'

export type GlobalState = {
  +assets: AssetState,
  +realEstate: RealEstateState,
  +balanceSheet: BalanceSheetState
}

export type ObjectStoreStatus = 'uninitialised'|'loading'|'loaded'|'error'

const logger = createLogger({ timestamp: false })
const enhancer = applyMiddleware(thunk, logger)

const configureStore = (initialState: GlobalState): Store => {
  return createStore(combinedReducer, initialState, enhancer)
}

export default configureStore
