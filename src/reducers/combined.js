// @flow

import { combineReducers } from 'redux'

import AssetsReducer from 'reducers/assets/assets'
import RealEstateReducer from 'reducers/assets/realEstate'
import LiabilitiesReducer from 'reducers/assets/assets'
import LoansReducer from 'reducers/liabilities/loans'
import BalanceSheetReducer from 'reducers/balanceSheet'

export default combineReducers({
  assets: AssetsReducer,
  realEstate: RealEstateReducer,
  liabilities: LiabilitiesReducer,
  loans: LoansReducer,
  balanceSheet: BalanceSheetReducer,
})
