// @flow

import type { Reducer, State, Action } from 'redux'

const RealEstateReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
  case 'UPDATE_REAL_ESTATE':
    console.log('state inside reducer', state)
    console.log('action.values', action.values)
    return { ...state, values: action.values }
  default:
    return state
  }
}

export default RealEstateReducer
