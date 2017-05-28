/* global expect */

describe('updateBalanceSheet', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../db/db', () => ({
      putObject: () => new Promise(resolve => resolve({ some: 'thing' })),
    }))
    const BalanceSheetActions = require('actions/balanceSheet')
    const thunk = BalanceSheetActions.updateBalanceSheet({ some: 'thing' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'thing' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BALANCE_SHEET_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BALANCE_SHEET_SUCCESS',
        balanceSheet: { some: 'thing' },
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../db/db', () => ({
      putObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const BalanceSheetActions = require('actions/balanceSheet')
    const thunk = BalanceSheetActions.updateBalanceSheet({ some: 'thing' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BALANCE_SHEET_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BALANCE_SHEET_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('loadBalanceSheet', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../db/db', () => ({
      getObject: () => new Promise(resolve => resolve({ some: 'thing' })),
    }))
    const BalanceSheetActions = require('actions/balanceSheet')
    const thunk = BalanceSheetActions.loadBalanceSheet()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'thing' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_BALANCE_SHEET_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_BALANCE_SHEET_SUCCESS',
        balanceSheet: { some: 'thing' },
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../db/db', () => ({
      getObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const BalanceSheetActions = require('actions/balanceSheet')
    const thunk = BalanceSheetActions.loadBalanceSheet()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_BALANCE_SHEET_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_BALANCE_SHEET_FAILURE',
        error: 'Some error',
      })
    })
  })
})
