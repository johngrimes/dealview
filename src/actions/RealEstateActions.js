// @flow

import type { Dispatch, Action } from 'redux'
import * as RealEstate from '../persisters/RealEstate.js'

type Values = { [key: string]: string }

export const saveRealEstate = (values: Values): Function =>
                              (dispatch: Dispatch): void => {
  if (values.id) {
    RealEstate.update(values)
      // The update function will return either 0 or 1, depending on whether
      // there was anything to change as compared to whatever was already in the
      // database. Either way, we reload based on the original ID.
      .then(result => dispatch(loadRealEstate(values.id)))
      .catch(error => dispatch(errorOccurred(error)))
  } else {
    RealEstate.save(values)
      // If the save was successful, we can reload the form based upon the new
      // ID we got passed back.
      .then(result => dispatch(loadRealEstate(result)))
      .catch(error => dispatch(errorOccurred(error)))
  }
  dispatch({ type: 'SAVE_REAL_ESTATE', values })
}

export const loadRealEstate = (id: string): Function =>
                              (dispatch: Dispatch): void => {
  RealEstate.load(id)
    .then(result => dispatch(updateRealEstate(result)))
    .catch(error => dispatch(errorOccurred(error)))
  dispatch({ type: 'LOAD_REAL_ESTATE', id })
}

export const errorOccurred = (error: string): Action => ({
  type: 'ERROR',
  error
})

export const updateRealEstate = (values: Values): Action => ({
  type: 'UPDATE_REAL_ESTATE',
  values
})
