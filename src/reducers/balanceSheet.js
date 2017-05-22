// @flow

import type { Reducer, State, Action } from 'redux'

import type { BalanceSheetOverTime } from 'data/balanceSheet'
import type { BalanceSheetAction } from 'actions/balanceSheet'

export type BalanceSheetState = {
  status: 'uninitialised'|'loading'|'loaded'|'error',
  error?: string,
  balanceSheet: BalanceSheetOverTime
}
const initialState: BalanceSheetState = {
  status: 'uninitialised',
  balanceSheet: {},
}

const BalanceSheetReducer: Reducer<State, Action> = (state = initialState, action: BalanceSheetAction) => {
  switch (action.type) {
    case 'LOAD_BALANCE_SHEET_REQUEST':
    case 'UPDATE_BALANCE_SHEET_REQUEST':
      return {
        ...state,
        status: 'loading',
      }
    case 'LOAD_BALANCE_SHEET_SUCCESS':
    case 'UPDATE_BALANCE_SHEET_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        balanceSheet: action.balanceSheet,
      }
    case 'LOAD_BALANCE_SHEET_FAILURE':
    case 'UPDATE_BALANCE_SHEET_FAILURE':
      return {
        ...state,
        status: 'error',
        error: action.error,
      }
    default:
      return state
  }
}

export default BalanceSheetReducer
