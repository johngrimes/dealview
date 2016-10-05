// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import type { Store, State } from 'redux'
import Thunk from 'redux-thunk'
import composeWithDevTools from './composeWithDevTools.js'

import AppReducer from '../reducers/AppReducer.js'
import Logger from '../middleware/Logger.js'

const enhancer = composeWithDevTools(
  applyMiddleware(Thunk)
)

const configureStore = (initialState: State): Store =>
  createStore(AppReducer, initialState, enhancer)

export default configureStore
