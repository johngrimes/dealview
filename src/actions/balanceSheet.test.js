/* global expect */

describe('updateBalanceSheet', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../types/balanceSheet', () => ({
      balanceSheetOverTime: () => ({ some: 'thing' }),
    }))
    jest.mock('../db/db', () => ({
      putObject: () => new Promise(resolve => resolve({ some: 'thing' })),
    }))
    jest.mock('../types/balanceSheet', () => ({
      balanceSheetOverTime: () => new Promise(resolve => resolve({ some: 'thing' })),
    }))
    const BalanceSheetActions = require('actions/balanceSheet')
    const thunk = BalanceSheetActions.updateBalanceSheet({}, {}, '2017-05-28', '2027-05-28')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'thing' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BALANCE_SHEET_REQUEST',
        assets: {},
        liabilities: {},
        startDate: '2017-05-28',
        endDate: '2027-05-28',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BALANCE_SHEET_SUCCESS',
        balanceSheet: { some: 'thing' },
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../types/balanceSheet', () => ({
      balanceSheetOverTime: () => ({ some: 'thing' }),
    }))
    jest.mock('../db/db', () => ({
      putObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const BalanceSheetActions = require('actions/balanceSheet')
    const thunk = BalanceSheetActions.updateBalanceSheet({}, {}, '2017-05-28', '2027-05-28')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BALANCE_SHEET_REQUEST',
        assets: {},
        liabilities: {},
        startDate: '2017-05-28',
        endDate: '2027-05-28',
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
