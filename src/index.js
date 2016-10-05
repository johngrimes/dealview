// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import Dexie from 'dexie'

import AppComponent from './components/App/AppComponent.js'
import configureStore from './store/configureStore.js'

window.db = new Dexie('DealView')
window.db.version(1).stores({
  realEstate: `++id, name, address1, address2, address3, locality, state,
    postcode, notes`
})
window.db.open().catch(error => console.log(error))

const store: Store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('app')
)
