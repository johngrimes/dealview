// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import configureStore from 'store'
import App from 'components/App/App'

const store: Store = configureStore({
  assets: {
    status: 'uninitialised',
    objects: {},
  },
  realEstate: {
    status: 'uninitialised',
    objects: {},
  },
  balanceSheet: {
    status: 'uninitialised',
    balanceSheet: {},
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
