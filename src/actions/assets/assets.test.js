/* global expect */

describe('putAsset', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../../db/db', () => ({
      putObject: () => new Promise(resolve => resolve({ some: 'thing' })),
    }))
    const AssetActions = require('actions/assets/assets').default
    const thunk = AssetActions.putAsset({ some: 'thing' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'thing' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_REQUEST',
        object: { some: 'thing' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'INVALIDATE_BALANCE_SHEET',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_SUCCESS',
        object: { some: 'thing' },
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../../db/db', () => ({
      putObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const AssetActions = require('actions/assets/assets').default
    const thunk = AssetActions.putAsset({ some: 'thing' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_REQUEST',
        object: { some: 'thing' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('deleteAsset', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../../db/db', () => ({
      deleteObject: () => new Promise(resolve => resolve('someKey')),
    }))
    const AssetActions = require('actions/assets/assets').default
    const thunk = AssetActions.deleteAsset('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual('someKey').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_ASSET_REQUEST',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'INVALIDATE_BALANCE_SHEET',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_ASSET_SUCCESS',
        id: 'someKey',
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../../db/db', () => ({
      deleteObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const AssetActions = require('actions/assets/assets').default
    const thunk = AssetActions.deleteAsset('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_ASSET_REQUEST',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_ASSET_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('loadAssets', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../../db/db', () => ({
      getAllObjects: () => new Promise(resolve => resolve([{ some: 'thing' }])),
    }))
    const AssetActions = require('actions/assets/assets').default
    const thunk = AssetActions.loadAssets()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual([{ some: 'thing' }]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_ASSETS_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_ASSETS_SUCCESS',
        objects: [{ some: 'thing' }],
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../../db/db', () => ({
      getAllObjects: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const AssetActions = require('actions/assets/assets').default
    const thunk = AssetActions.loadAssets()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_ASSETS_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_ASSETS_FAILURE',
        error: 'Some error',
      })
    })
  })
})
