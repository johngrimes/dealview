// @flow

import _ from 'lodash'
import type { Reducer, State, Action } from 'redux'

import type { ObjectMap } from 'types/commonTypes'
// import type { AssetAction } from 'actions/assets'

export type ObjectStoreState = {
  +status: 'uninitialised'|'loading'|'loaded'|'error',
  +error?: string,
  +objects: ObjectMap
}
export const InitialObjectStoreState: ObjectStoreState = {
  status: 'uninitialised',
  objects: {},
}

export const createObjectsReducer = (name: string, pluralName: string): Reducer<State, Action> => {
  return (state = InitialObjectStoreState, action) => {
    switch (action.type) {
      case `PUT_${name}_REQUEST`:
      case `DELETE_${name}_REQUEST`:
      case `LOAD_${pluralName}_REQUEST`:
        return {
          ...state,
          status: 'loading',
        }
      case `PUT_${name}_SUCCESS`:
        return {
          ...state,
          status: 'loaded',
          objects: { ...state.objects, [action.object.id]: action.object },
        }
      case `DELETE_${name}_SUCCESS`:
        return {
          ...state,
          status: 'loaded',
          objects: _.omit(state.objects, action.id),
        }
      case `LOAD_${pluralName}_SUCCESS`:
        return {
          ...state,
          status: 'loaded',
          objects: action.objects,
        }
      case `PUT_${name}_FAILURE`:
      case `DELETE_${name}_FAILURE`:
      case `LOAD_${pluralName}_FAILURE`:
        return {
          ...state,
          status: 'error',
          error: action.error,
        }
      default:
        return state
    }
  }
}
