// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import configureStore from './store.js'
import AppComponent from './components/App/AppComponent.js'

const store: Store = configureStore({
  assets: {
    status: 'uninitialised',
    objects: {}
  },
  realEstate: {
    status: 'uninitialised',
    objects: {}
  }
})

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('app')
)
