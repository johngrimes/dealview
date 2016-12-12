// @flow

import { combineReducers } from 'redux'
import type { Reducer, State, Action } from 'redux'
import { reducer as formReducer } from 'redux-form'
import RealEstateReducer from './RealEstateReducer.js'

const app: Reducer<State, Action> = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, route: action.location.pathname }
    default:
      return state
  }
}

const form: Reducer<State, Action> = formReducer.plugin({ realEstate: RealEstateReducer })

const AppReducer: Reducer<State, Action> = combineReducers({
  app,
  form
})

export default AppReducer
