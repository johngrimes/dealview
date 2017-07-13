import _ from 'lodash'

import { putObject, getObject } from '../data/db.js'

const objectStore = 'BalanceSheet'
const theOneAndOnlyKey = 'BalanceSheet'

export const calculateBalanceSheet = (assets, liabilities, startDate, endDate) => {
  return {
    task: 'CALCULATE_BALANCE_SHEET',
    assets,
    liabilities,
    startDate,
    endDate,
  }
}

export const loadBalanceSheetRequest = () => {
  return { type: 'LOAD_BALANCE_SHEET_REQUEST' }
}

export const loadBalanceSheetSuccess = balanceSheet => {
  return {
    type: 'LOAD_BALANCE_SHEET_SUCCESS',
    balanceSheet,
  }
}

export const loadBalanceSheetFailure = error => {
  return {
    type: 'LOAD_BALANCE_SHEET_FAILURE',
    error,
  }
}

export const updateBalanceSheetRequest = (assets, liabilities, startDate, endDate) => {
  return {
    type: 'UPDATE_BALANCE_SHEET_REQUEST',
    assets,
    liabilities,
    startDate,
    endDate,
  }
}

export const updateBalanceSheetSuccess = balanceSheet => {
  return {
    type: 'UPDATE_BALANCE_SHEET_SUCCESS',
    balanceSheet,
  }
}

export const updateBalanceSheetFailure = error => {
  return {
    type: 'UPDATE_BALANCE_SHEET_FAILURE',
    error,
  }
}

export const invalidateBalanceSheet = () => {
  return { type: 'INVALIDATE_BALANCE_SHEET' }
}

export const updateBalanceSheet = (assets, liabilities, startDate, endDate) => {
  return dispatch => {
    dispatch(updateBalanceSheetRequest(assets, liabilities, startDate, endDate))
    return new Promise(async (resolve, reject) => {
      try {
        const worker = new Worker('/static/js/worker.js')
        worker.onmessage = async event => {
          console.log('Balance sheet calc returned:', event.data)
          const savedWithId = await putObject(objectStore, event.data, theOneAndOnlyKey)
          const saved = _.omit(savedWithId, 'id')
          dispatch(updateBalanceSheetSuccess(saved))
          resolve(saved)
        }
        worker.postMessage([ assets, liabilities, startDate, endDate ])
      } catch (error) {
        dispatch(updateBalanceSheetFailure(error.message))
        reject(error)
      }
    })
  }
}

export const loadBalanceSheet = () => {
  return dispatch => {
    dispatch(loadBalanceSheetRequest())
    return new Promise(async (resolve, reject) => {
      try {
        const balanceSheetWithId = await getObject(objectStore, theOneAndOnlyKey)
        const balanceSheet = _.omit(balanceSheetWithId, 'id')
        dispatch(loadBalanceSheetSuccess(balanceSheet))
        resolve(balanceSheet)
      } catch (error) {
        dispatch(loadBalanceSheetFailure(error.message))
        reject(error)
      }
    })
  }
}
