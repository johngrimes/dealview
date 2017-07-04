// @flow

import { putObject, deleteObject, getAllObjects } from 'db/db'
import { invalidateBalanceSheet } from 'actions/balanceSheet'
import { createObjectActions } from 'actions/objects'
import type { Liability } from 'types/liabilities/liability'
import type { Thunk } from 'types/commonTypes'

const objectStore = 'Liability'

const actions = createObjectActions('LIABILITY', 'LIABILITIES',
                                    'Liability', 'Liabilities')

const putLiability = (liability: Liability): Thunk => {
  return dispatch => {
    dispatch(actions.putLiabilityRequest(liability))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, liability)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.putLiabilitySuccess(saved))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putLiabilityFailure(error))
        reject(error)
      }
    })
  }
}

const deleteLiability = (id: string): Thunk => {
  return dispatch => {
    dispatch(actions.deleteLiabilityRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const key = await deleteObject(objectStore, id)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.deleteLiabilitySuccess(key))
        resolve(key)
      } catch (error) {
        dispatch(actions.deleteLiabilityFailure(error))
        reject(error)
      }
    })
  }
}

const loadLiabilities = (): Thunk => {
  return dispatch => {
    dispatch(actions.loadLiabilitiesRequest())
    return new Promise(async (resolve, reject) => {
      try {
        const liabilities = await getAllObjects(objectStore)
        dispatch(actions.loadLiabilitiesSuccess(liabilities))
        resolve(liabilities)
      } catch (error) {
        dispatch(actions.loadLiabilitiesFailure(error))
        reject(error)
      }
    })
  }
}

export default {
  ...actions,
  putLiability,
  deleteLiability,
  loadLiabilities,
}
