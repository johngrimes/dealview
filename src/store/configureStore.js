// @flow

import { createStore } from 'redux'
import type { Store, State } from 'redux'

import AppReducer from '../reducers/AppReducer.js'

const configureStore = (initialState: State): Store =>
  createStore(AppReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default configureStore
