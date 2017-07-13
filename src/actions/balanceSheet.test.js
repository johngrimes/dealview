describe('loadBalanceSheet', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../data/db.js', () => ({
      getObject: () =>
        new Promise(resolve => resolve({ some: 'thing', id: 'blah' })),
    }))
    const BalanceSheetActions = require('../actions/balanceSheet.js')
    const thunk = BalanceSheetActions.loadBalanceSheet()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves
      .toEqual({ some: 'thing' })
      .then(() => {
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
    jest.mock('../data/db.js', () => ({
      getObject: () =>
        new Promise((resolve, reject) => reject(new Error('Some error'))),
    }))
    const BalanceSheetActions = require('../actions/balanceSheet.js')
    const thunk = BalanceSheetActions.loadBalanceSheet()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects
      .toEqual(new Error('Some error'))
      .then(() => {
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
