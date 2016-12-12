// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import configureStore from './store/configureStore.js'
import AppComponent from './components/App/AppComponent.js'

const store: Store = configureStore({
  app: { route: window.location },
  form: { realEstate: { activePage: 'general' } }
})

// Dispatch an action whenever the location of the page changes.
const handlePopState = (location) => store.dispatch({
  type: 'SET_LOCATION',
  location: location
})
window.addEventListener('popstate', handlePopState)

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('app')
)
