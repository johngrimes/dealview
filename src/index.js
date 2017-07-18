import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store.js'
import { InitialAssetState } from './reducers/assets.js'
import { InitialLiabilityState } from './reducers/liabilities.js'
import { InitialLoanState } from './reducers/loans.js'
import { InitialBalanceSheetState } from './reducers/balanceSheet.js'
import App from './components/App.js'
import registerServiceWorker from './utils/registerServiceWorker.js'

import './styles/base.css'

const store = configureStore({
  assets: InitialAssetState,
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

registerServiceWorker()
