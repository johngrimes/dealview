// @flow

import { combineReducers } from 'redux'

import AssetsReducer from 'reducers/assets'
import RealEstateReducer from 'reducers/realEstate'
import BalanceSheetReducer from 'reducers/balanceSheet'

export default combineReducers({
  assets: AssetsReducer,
  realEstate: RealEstateReducer,
  balanceSheet: BalanceSheetReducer,
})
