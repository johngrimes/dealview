// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import configureStore from 'store'
import { InitialAssetState } from 'reducers/assets'
import { InitialRealEstateState } from 'reducers/realEstate'
import { InitialBalanceSheetState } from 'reducers/balanceSheet'
import App from 'components/App/App'

const store: Store = configureStore({
  assets: InitialAssetState,
  realEstate: InitialRealEstateState,
  balanceSheet: InitialBalanceSheetState,
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
