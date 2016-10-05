// @flow

import { combineReducers } from 'redux'
import type { Reducer, State, Action } from 'redux'
import { reducer as formReducer } from 'redux-form'
import RealEstateReducer from './RealEstateReducer.js'

const app: Reducer<State, Action> = combineReducers({
  form: formReducer.plugin({ realEstate: RealEstateReducer })
})

export default app
