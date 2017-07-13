describe('putLoan', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../data/db.js', () => ({
      putObject: objectStore =>
        objectStore === 'Liability.Loan'
          ? new Promise(resolve => resolve({ some: 'loan' }))
          : new Promise(resolve => resolve({ some: 'asset' })),
    }))
    jest.mock('../data/loan.js', () => ({
      loanToLiability: () => ({ some: 'asset' }),
    }))
    const LoanActions = require('../actions/loans.js').default
    const thunk = LoanActions.putLoan({ some: 'loan' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'loan' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LOAN_REQUEST',
        object: { some: 'loan' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LOAN_SUCCESS',
        object: { some: 'loan' },
      })
    })
  })

  it('should dispatch correct actions on failure to save Loan', () => {
    jest.mock('../data/db.js', () => ({
      putObject: objectStore =>
        objectStore === 'Liability.Loan'
          ? new Promise((resolve, reject) => reject(new Error('Some error')))
          : new Promise(resolve => resolve({ some: 'asset' })),
    }))
    const LoanActions = require('../actions/loans.js').default
    const thunk = LoanActions.putLoan({ some: 'loan' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual(new Error('Some error')).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LOAN_REQUEST',
        object: { some: 'loan' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LOAN_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('deleteLoan', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../data/db.js', () => ({
      deleteObject: () => new Promise(resolve => resolve('someKey')),
    }))
    const LoanActions = require('../actions/loans.js').default
    const thunk = LoanActions.deleteLoan('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual('someKey').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LOAN_REQUEST',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LOAN_SUCCESS',
        id: 'someKey',
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../data/db.js', () => ({
      deleteObject: () => new Promise((resolve, reject) => reject(new Error('Some error'))),
    }))
    const LoanActions = require('../actions/loans.js').default
    const thunk = LoanActions.deleteLoan('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual(new Error('Some error')).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LOAN_REQUEST',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LOAN_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('loadLoans', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../data/db.js', () => ({
      getAllObjects: () => new Promise(resolve => resolve([{ some: 'thing' }])),
    }))
    const LoanActions = require('../actions/loans.js').default
    const thunk = LoanActions.loadLoans()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual([{ some: 'thing' }]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LOANS_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LOANS_SUCCESS',
        objects: [{ some: 'thing' }],
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../data/db.js', () => ({
      getAllObjects: () => new Promise((resolve, reject) => reject(new Error('Some error'))),
    }))
    const LoanActions = require('../actions/loans.js').default
    const thunk = LoanActions.loadLoans()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual(new Error('Some error')).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LOANS_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LOANS_FAILURE',
        error: 'Some error',
      })
    })
  })
})
