// @flow

import type { Reducer, State, Action } from 'redux'

import type { BalanceSheetOverTime } from 'types/balanceSheet'
import type { BalanceSheetAction } from 'actions/balanceSheet'

export type BalanceSheetState = {
  +status: 'uninitialised'|'loading'|'loaded'|'error',
  +fresh: boolean,
  +error?: string,
  +balanceSheet: BalanceSheetOverTime
}
export const InitialBalanceSheetState: BalanceSheetState = {
  status: 'uninitialised',
  fresh: true,
  balanceSheet: {},
}

const BalanceSheetReducer: Reducer<State, Action> = (state = InitialBalanceSheetState, action: BalanceSheetAction) => {
  switch (action.type) {
    case 'LOAD_BALANCE_SHEET_REQUEST':
    case 'UPDATE_BALANCE_SHEET_REQUEST':
      return {
        ...state,
        status: 'loading',
      }
    case 'LOAD_BALANCE_SHEET_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        balanceSheet: action.balanceSheet,
      }
    case 'UPDATE_BALANCE_SHEET_SUCCESS':
      return {
        ...state,
        status: 'loaded',
        fresh: true,
        balanceSheet: action.balanceSheet,
      }
    case 'LOAD_BALANCE_SHEET_FAILURE':
    case 'UPDATE_BALANCE_SHEET_FAILURE':
      return {
        ...state,
        status: 'error',
        error: action.error,
      }
    case 'INVALIDATE_BALANCE_SHEET':
      return {
        ...state,
        fresh: false,
      }
    default:
      return state
  }
}

export default BalanceSheetReducer
