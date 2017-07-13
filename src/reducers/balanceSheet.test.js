import BalanceSheetReducer from './balanceSheet.js'
import * as BalanceSheetActions from '../actions/balanceSheet.js'
import {
  validBalanceSheet1,
  validBalanceSheet2,
} from '../data/fixtures/balanceSheet.js'

describe('BalanceSheetReducer', () => {
  const initialState = {
    status: 'loaded',
    fresh: true,
    balanceSheet: validBalanceSheet1,
  }

  it('should update state upon request', () => {
    const actions = [
      BalanceSheetActions.updateBalanceSheetRequest,
      BalanceSheetActions.loadBalanceSheetRequest,
    ]
    actions.forEach(action => {
      const nextState = BalanceSheetReducer(initialState, action())
      expect(nextState).toMatchSnapshot()
    })
  })

  it('should update state upon update success', () => {
    const action = BalanceSheetActions.updateBalanceSheetSuccess(
      validBalanceSheet2
    )
    const nextState = BalanceSheetReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should freshen upon update success', () => {
    const action = BalanceSheetActions.updateBalanceSheetSuccess(
      validBalanceSheet2
    )
    const nextState = BalanceSheetReducer(
      { ...initialState, fresh: false },
      action
    )
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon load success', () => {
    const action = BalanceSheetActions.loadBalanceSheetSuccess(
      validBalanceSheet2
    )
    const nextState = BalanceSheetReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon failure', () => {
    const actions = [
      BalanceSheetActions.updateBalanceSheetFailure,
      BalanceSheetActions.loadBalanceSheetFailure,
    ]
    actions.forEach(action => {
      const nextState = BalanceSheetReducer(initialState, action('Some error'))
      expect(nextState).toMatchSnapshot()
    })
  })

  it('should invalidate balance sheet', () => {
    const action = BalanceSheetActions.invalidateBalanceSheet()
    const nextState = BalanceSheetReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })
})
