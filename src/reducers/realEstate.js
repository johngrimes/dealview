// @flow

import _ from 'lodash'
import type { Reducer, State, Action } from 'redux'

import type { RealEstateMap } from 'types/assets/realEstate'
import type { RealEstateAction } from 'actions/realEstate'
import type { ObjectStoreStatus } from 'store'

export type RealEstateState = {
  status: ObjectStoreStatus,
  error?: string,
  objects: RealEstateMap
}
export const InitialRealEstateState: RealEstateState = {
  status: 'uninitialised',
  objects: {},
}

const RealEstateReducer: Reducer<State, Action> = (state = InitialRealEstateState, action: RealEstateAction) => {
  switch (action.type) {
    case 'PUT_REAL_ESTATE_REQUEST':
    case 'DELETE_REAL_ESTATE_REQUEST':
    case 'LOAD_REAL_ESTATE_REQUEST':
      return {
        ...state,
        status: 'loading',
      }
    case 'PUT_REAL_ESTATE_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        objects: { ...state.objects, [action.realEstate.id]: action.realEstate },
      }
    case 'DELETE_REAL_ESTATE_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        objects: _.omit(state.objects, action.id),
      }
    case 'LOAD_REAL_ESTATE_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        objects: action.realEstate,
      }
    case 'PUT_REAL_ESTATE_FAILURE':
    case 'DELETE_REAL_ESTATE_FAILURE':
    case 'LOAD_REAL_ESTATE_FAILURE':
      return {
        ...state,
        status: 'error',
        error: action.error,
      }
    default:
      return state
  }
}

export default RealEstateReducer
