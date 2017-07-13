import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import combinedReducer from './reducers/combined.js'

const logger = createLogger({ timestamp: false })
const enhancer = applyMiddleware(thunk, logger)

const configureStore = initialState => {
  return createStore(combinedReducer, initialState, enhancer)
}

export default configureStore
