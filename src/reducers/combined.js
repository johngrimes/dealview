import { combineReducers } from 'redux'

import AssetsReducer from './assets.js'
import RealEstateReducer from './realEstate.js'
import LiabilitiesReducer from './liabilities.js'
import LoansReducer from './loans.js'
import BalanceSheetReducer from './balanceSheet.js'

export default combineReducers({
  assets: AssetsReducer,
  realEstate: RealEstateReducer,
  liabilities: LiabilitiesReducer,
  loans: LoansReducer,
  balanceSheet: BalanceSheetReducer,
})
