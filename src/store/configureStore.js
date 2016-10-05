// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import type { Store } from 'redux'
import Thunk from 'redux-thunk'

import AppReducer from '../reducers/AppReducer.js'
import Logger from '../middleware/Logger.js'
import DevTools from '../components/DevTools.js'

const enhancer = compose(
  applyMiddleware(Logger, Thunk),
  DevTools.instrument()
)

const configureStore = (initialState: Object): Store =>
  createStore(AppReducer, initialState, enhancer)

export default configureStore
