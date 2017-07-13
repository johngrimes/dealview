import { createObjectActions } from './objects.js'
import LiabilityActions from './liabilities.js'
import { putObject, deleteObject, getAllObjects } from '../data/db.js'
import { loanToLiability } from '../data/loan.js'

const objectStore = 'Liability.Loan'

const actions = createObjectActions('LOAN', 'LOANS', 'Loan', 'Loans')

const putLoan = loan => {
  return dispatch => {
    dispatch(actions.putLoanRequest(loan))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, loan)
        dispatch(actions.putLoanSuccess(saved))
        await dispatch(LiabilityActions.putLiability(loanToLiability(saved)))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putLoanFailure(error.message))
        reject(error)
      }
    })
  }
}

const deleteLoan = id => {
  return dispatch => {
    dispatch(actions.deleteLoanRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const deletedId = await deleteObject(objectStore, id)
        dispatch(LiabilityActions.deleteLiability(deletedId))
        dispatch(actions.deleteLoanSuccess(deletedId))
        resolve(deletedId)
      } catch (error) {
        dispatch(actions.deleteLoanFailure(error.message))
        reject(error)
      }
    })
  }
}

const loadLoans = () => {
  return dispatch => {
    dispatch(actions.loadLoansRequest())
    return new Promise((resolve, reject) => {
      getAllObjects(objectStore)
        .then(liabilities => {
          dispatch(actions.loadLoansSuccess(liabilities))
          resolve(liabilities)
        })
        .catch(error => {
          dispatch(actions.loadLoansFailure(error.message))
          reject(error)
        })
    })
  }
}

export default {
  ...actions,
  putLoan,
  deleteLoan,
  loadLoans,
}
