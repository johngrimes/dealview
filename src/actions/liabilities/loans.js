// @flow

import { putObject, deleteObject, getAllObjects } from 'db/db'
import LiabilityActions from 'actions/liabilities/liabilities'
import { loanToLiability } from 'types/liabilities/loan'
import { createObjectActions } from 'actions/objects'
import type { Loan } from 'types/liabilities/loan'
import type { Thunk } from 'types/commonTypes'

const objectStore = 'Liability.Loan'

const actions = createObjectActions('LOAN', 'LOANS',
                                    'Loan', 'Loans')

const putLoan = (loan: Loan): Thunk => {
  return dispatch => {
    dispatch(actions.putLoanRequest(loan))
    return new Promise(async (resolve, reject) => {
      try {
        const saved = await putObject(objectStore, loan)
        dispatch(actions.putLoanSuccess(saved))
        await dispatch(LiabilityActions.putLiability(loanToLiability(saved)))
        resolve(saved)
      } catch (error) {
        dispatch(actions.putLoanFailure(error))
        reject(error)
      }
    })
  }
}

const deleteLoan = (id: string): Thunk => {
  return dispatch => {
    dispatch(actions.deleteLoanRequest(id))
    return new Promise(async (resolve, reject) => {
      try {
        const deletedId = await deleteObject(objectStore, id)
        dispatch(LiabilityActions.deleteLiability(deletedId))
        dispatch(actions.deleteLoanSuccess(deletedId))
        resolve(deletedId)
      } catch (error) {
        dispatch(actions.deleteLoanFailure(error))
        reject(error)
      }
    })
  }
}

const loadLoans = (): Thunk => {
  return dispatch => {
    dispatch(actions.loadLoansRequest())
    return new Promise((resolve, reject) => {
      getAllObjects(objectStore).then(liabilities => {
        dispatch(actions.loadLoansSuccess(liabilities))
        resolve(liabilities)
      }).catch(error => {
        dispatch(actions.loadLoansFailure(error))
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
