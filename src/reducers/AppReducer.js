// @flow

import type { Reducer, State, Action } from 'redux'

const AppReducer: Reducer<State, Action> = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, route: action.location.pathname }
    default:
      return state
  }
}

export default AppReducer
