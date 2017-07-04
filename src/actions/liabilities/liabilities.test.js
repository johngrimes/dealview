/* global expect */

describe('putLiability', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../../db/db', () => ({
      putObject: () => new Promise(resolve => resolve({ some: 'thing' })),
    }))
    const LiabilityActions = require('actions/liabilities/liabilities').default
    const thunk = LiabilityActions.putLiability({ some: 'thing' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'thing' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LIABILITY_REQUEST',
        object: { some: 'thing' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'INVALIDATE_BALANCE_SHEET',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LIABILITY_SUCCESS',
        object: { some: 'thing' },
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../../db/db', () => ({
      putObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const LiabilityActions = require('actions/liabilities/liabilities').default
    const thunk = LiabilityActions.putLiability({ some: 'thing' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LIABILITY_REQUEST',
        object: { some: 'thing' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_LIABILITY_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('deleteLiability', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../../db/db', () => ({
      deleteObject: () => new Promise(resolve => resolve('someKey')),
    }))
    const LiabilityActions = require('actions/liabilities/liabilities').default
    const thunk = LiabilityActions.deleteLiability('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual('someKey').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LIABILITY_REQUEST',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'INVALIDATE_BALANCE_SHEET',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LIABILITY_SUCCESS',
        id: 'someKey',
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../../db/db', () => ({
      deleteObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const LiabilityActions = require('actions/liabilities/liabilities').default
    const thunk = LiabilityActions.deleteLiability('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LIABILITY_REQUEST',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_LIABILITY_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('loadLiabilities', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../../db/db', () => ({
      getAllObjects: () => new Promise(resolve => resolve([{ some: 'thing' }])),
    }))
    const LiabilityActions = require('actions/liabilities/liabilities').default
    const thunk = LiabilityActions.loadLiabilities()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual([{ some: 'thing' }]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LIABILITIES_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LIABILITIES_SUCCESS',
        objects: [{ some: 'thing' }],
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../../db/db', () => ({
      getAllObjects: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const LiabilityActions = require('actions/liabilities/liabilities').default
    const thunk = LiabilityActions.loadLiabilities()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LIABILITIES_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_LIABILITIES_FAILURE',
        error: 'Some error',
      })
    })
  })
})
