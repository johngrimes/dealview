import { createObjectActions } from './objects.js'
import { invalidateBalanceSheet } from './balanceSheet.js'
import { putObject, deleteObject, getAllObjects } from '../data/db.js'

const objectStore = 'Liability'

const actions = createObjectActions(
  'LIABILITY',
  'LIABILITIES',
  'Liability',
  'Liabilities'
)

const putLiability = liability => {
  return dispatch => {
    dispatch(actions.putLiabilityRequest(liability))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, liability)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.putLiabilitySuccess(saved))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putLiabilityFailure(error.message))
        reject(error)
      }
    })
  }
}

const deleteLiability = id => {
  return dispatch => {
    dispatch(actions.deleteLiabilityRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const key = await deleteObject(objectStore, id)
        dispatch(invalidateBalanceSheet())
        dispatch(actions.deleteLiabilitySuccess(key))
        resolve(key)
      } catch (error) {
        dispatch(actions.deleteLiabilityFailure(error.message))
        reject(error)
      }
    })
  }
}

const loadLiabilities = () => {
  return dispatch => {
    dispatch(actions.loadLiabilitiesRequest())
    return new Promise(async (resolve, reject) => {
      try {
        const liabilities = await getAllObjects(objectStore)
        dispatch(actions.loadLiabilitiesSuccess(liabilities))
        resolve(liabilities)
      } catch (error) {
        dispatch(actions.loadLiabilitiesFailure(error.message))
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
