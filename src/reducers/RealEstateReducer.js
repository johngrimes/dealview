// @flow

import type { Reducer, State, Action } from 'redux'

const RealEstateReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
  case 'UPDATE_REAL_ESTATE':
    return { ...state, values: action.values }
  default:
    return state
  }
}

export default RealEstateReducer
