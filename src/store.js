// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import type { Store } from 'redux'

import AssetsReducer from 'reducers/assets'
import RealEstateReducer from 'reducers/realEstate'
import BalanceSheetReducer from 'reducers/balanceSheet'
import { watchAssets } from 'db/sagas/assets'
import { watchRealEstate } from 'db/sagas/realEstate'
import type { AssetState } from 'reducers/assets'
import type { RealEstateState } from 'reducers/realEstate'
import type { BalanceSheetState } from 'reducers/balanceSheet'

export type GlobalState = {
  assets: AssetState,
  realEstate: RealEstateState,
  balanceSheet: BalanceSheetState
}

export type ObjectStoreStatus = 'uninitialised'|'loading'|'loaded'|'error'

const sagaMiddleware = createSagaMiddleware()

const configureStore = (initialState: GlobalState): Store => {
  const reducer = combineReducers({
    assets: AssetsReducer,
    realEstate: RealEstateReducer,
    balanceSheet: BalanceSheetReducer,
  })
  return createStore(reducer, initialState, applyMiddleware(createSagaMiddleware, logger))
}

sagaMiddleware.run(watchRealEstate)
sagaMiddleware.run(watchAssets)

export default configureStore
