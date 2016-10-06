import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import AppComponent from './AppComponent'
import configureStore from '../../store/configureStore.js'

it('renders without crashing', () => {
  const store: Store = configureStore({})

  ReactDOM.render(
    <Provider store={store}>
      <AppComponent />
    </Provider>,
    document.createElement('div')
  )
})
