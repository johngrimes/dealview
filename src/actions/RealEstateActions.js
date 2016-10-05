// @flow

import type { Dispatch, Action } from 'redux'
import * as RealEstate from '../persisters/RealEstate.js'

type Values = { [key: string]: string }

export const saveRealEstate = (values: Values): Function =>
                              (dispatch: Dispatch): Action => {
  if (values.id) {
    RealEstate.update(values)
      .then(result => dispatch(loadRealEstate(result)))
      .catch(error => dispatch(errorOccurred(error)))
  } else {
    RealEstate.save(values)
      .then(result => dispatch(updateRealEstate(result)))
      .catch(error => dispatch(errorOccurred(error)))
  }
  return { type: 'SAVE_REAL_ESTATE' }
}

export const loadRealEstate = (id: string): Function =>
                              (dispatch: Dispatch): Action => {
  RealEstate.load(id)
    .then(result => dispatch(updateRealEstate(result)))
    .catch(error => dispatch(errorOccurred(error)))
  return { type: 'LOAD_REAL_ESTATE' }
}

export const errorOccurred = (error: string): Action => ({
  type: 'ERROR_OCCURRED',
  error
})

export const updateRealEstate = (values: Values): Action => ({
  type: 'UPDATE_REAL_ESTATE',
  values
})
