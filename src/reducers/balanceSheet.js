export const InitialBalanceSheetState = {
  status: 'uninitialised',
  fresh: true,
  balanceSheet: {},
}

const BalanceSheetReducer = (state = InitialBalanceSheetState, action) => {
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
