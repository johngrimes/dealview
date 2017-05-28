/* global expect */

describe('putRealEstate', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../db/db', () => ({
      putObject: objectStore => objectStore === 'Asset.RealEstate'
        ? new Promise(resolve => resolve({ some: 'realEstate' }))
        : new Promise(resolve => resolve({ some: 'asset' })),
    }))
    jest.mock('../types/assets/realEstate', () => ({
      realEstateToAsset: () => ({ some: 'asset' }),
    }))
    const RealEstateActions = require('actions/realEstate')
    const thunk = RealEstateActions.putRealEstate({ some: 'realEstate' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'realEstate' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_SUCCESS',
        realEstate: { some: 'realEstate' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_SUCCESS',
        asset: { some: 'asset' },
      })
    })
  })

  it('should dispatch correct actions on failure to save RealEstate', () => {
    jest.mock('../db/db', () => ({
      putObject: objectStore => objectStore === 'Asset.RealEstate'
        ? new Promise((resolve, reject) => reject('Some error'))
        : new Promise(resolve => resolve({ some: 'asset' })),
    }))
    const RealEstateActions = require('actions/realEstate')
    const thunk = RealEstateActions.putRealEstate({ some: 'thing' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_FAILURE',
        error: 'Some error',
      })
    })
  })

  it('should dispatch correct actions on failure to save Asset', () => {
    jest.mock('../db/db', () => ({
      putObject: objectStore => objectStore === 'Asset'
        ? new Promise((resolve, reject) => reject('Some error'))
        : new Promise(resolve => resolve({ id: 'someId', some: 'realEstate' })),
      deleteObject: () => new Promise(resolve => resolve('someId')),
    }))
    const RealEstateActions = require('actions/realEstate')
    const thunk = RealEstateActions.putRealEstate({ some: 'realEstate' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_SUCCESS',
        realEstate: {
          id: 'someId',
          some: 'realEstate',
        },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_ASSET_FAILURE',
        error: 'Some error',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_SUCCESS',
        id: 'someId',
      })
    })
  })
})

describe('deleteRealEstate', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../db/db', () => ({
      deleteObject: () => new Promise(resolve => resolve('someKey')),
    }))
    const RealEstateActions = require('actions/realEstate')
    const thunk = RealEstateActions.deleteRealEstate('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual('someKey').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_SUCCESS',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_ASSET_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_ASSET_SUCCESS',
        id: 'someKey',
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../db/db', () => ({
      deleteObject: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const RealEstateActions = require('actions/realEstate')
    const thunk = RealEstateActions.deleteRealEstate('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('loadRealEstate', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../db/db', () => ({
      getAllObjects: () => new Promise(resolve => resolve([{ some: 'thing' }])),
    }))
    const RealEstateActions = require('actions/realEstate')
    const thunk = RealEstateActions.loadRealEstate()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual([{ some: 'thing' }]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_REAL_ESTATE_SUCCESS',
        realEstate: [{ some: 'thing' }],
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../db/db', () => ({
      getAllObjects: () => new Promise((resolve, reject) => reject('Some error')),
    }))
    const RealEstateActions = require('actions/realEstate')
    const thunk = RealEstateActions.loadRealEstate()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual('Some error').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_REAL_ESTATE_FAILURE',
        error: 'Some error',
      })
    })
  })
})
