// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import configureStore from './store/configureStore.js'
import EventPublisher from './data/events/EventPublisher.js'
import { listener as eventListener } from './data/events/listener.js'
import AppComponent from './components/App/AppComponent.js'

const store: Store = configureStore({
  app: { route: window.location }
})

const eventPublisher = new EventPublisher()
eventPublisher.subscribe('CreateRealEstate', eventListener)

ReactDOM.render(
  <Provider store={store}>
    <AppComponent eventPublisher={eventPublisher} />
  </Provider>,
  document.getElementById('app')
)
