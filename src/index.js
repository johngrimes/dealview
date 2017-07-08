// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import configureStore from 'store'
import { InitialAssetState } from 'reducers/assets/assets'
import { InitialRealEstateState } from 'reducers/assets/realEstate'
import { InitialLiabilityState } from 'reducers/liabilities/liabilities'
import { InitialLoanState } from 'reducers/liabilities/loans'
import { InitialBalanceSheetState } from 'reducers/balanceSheet'
import App from 'components/App/App'

const store: Store = configureStore({
  assets: InitialAssetState,
  realEstate: InitialRealEstateState,
  liabilities: InitialLiabilityState,
  loans: InitialLoanState,
  balanceSheet: InitialBalanceSheetState,
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
