describe('putRealEstate', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../data/db.js', () => ({
      putObject: objectStore =>
        objectStore === 'Asset.RealEstate'
          ? new Promise(resolve => resolve({ some: 'realEstate' }))
          : new Promise(resolve => resolve({ some: 'asset' })),
    }))
    jest.mock('../data/realEstate.js', () => ({
      realEstateToAsset: () => ({ some: 'asset' }),
    }))
    const RealEstateActions = require('../actions/realEstate.js').default
    const thunk = RealEstateActions.putRealEstate({ some: 'realEstate' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual({ some: 'realEstate' }).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_REQUEST',
        object: { some: 'realEstate' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_SUCCESS',
        object: { some: 'realEstate' },
      })
    })
  })

  it('should dispatch correct actions on failure to save RealEstate', () => {
    jest.mock('../data/db.js', () => ({
      putObject: objectStore =>
        objectStore === 'Asset.RealEstate'
          ? new Promise((resolve, reject) => reject(new Error('Some error')))
          : new Promise(resolve => resolve({ some: 'asset' })),
    }))
    const RealEstateActions = require('../actions/realEstate.js').default
    const thunk = RealEstateActions.putRealEstate({ some: 'realEstate' })
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual(new Error('Some error')).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_REQUEST',
        object: { some: 'realEstate' },
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'PUT_REAL_ESTATE_FAILURE',
        error: 'Some error',
      })
    })
  })
})

describe('deleteRealEstate', () => {
  afterEach(() => {
    jest.resetModules()
  })

  it('should dispatch correct actions on success', () => {
    jest.mock('../data/db.js', () => ({
      deleteObject: () => new Promise(resolve => resolve('someKey')),
    }))
    const RealEstateActions = require('../actions/realEstate.js').default
    const thunk = RealEstateActions.deleteRealEstate('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual('someKey').then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_REQUEST',
        id: 'someKey',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_SUCCESS',
        id: 'someKey',
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../data/db.js', () => ({
      deleteObject: () => new Promise((resolve, reject) => reject(new Error('Some error'))),
    }))
    const RealEstateActions = require('../actions/realEstate.js').default
    const thunk = RealEstateActions.deleteRealEstate('someKey')
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual(new Error('Some error')).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'DELETE_REAL_ESTATE_REQUEST',
        id: 'someKey',
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
    jest.mock('../data/db.js', () => ({
      getAllObjects: () => new Promise(resolve => resolve([{ some: 'thing' }])),
    }))
    const RealEstateActions = require('../actions/realEstate.js').default
    const thunk = RealEstateActions.loadRealEstate()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).resolves.toEqual([{ some: 'thing' }]).then(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_REAL_ESTATE_REQUEST',
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOAD_REAL_ESTATE_SUCCESS',
        objects: [{ some: 'thing' }],
      })
    })
  })

  it('should dispatch correct actions on failure', () => {
    jest.mock('../data/db.js', () => ({
      getAllObjects: () => new Promise((resolve, reject) => reject(new Error('Some error'))),
    }))
    const RealEstateActions = require('../actions/realEstate.js').default
    const thunk = RealEstateActions.loadRealEstate()
    const dispatch = jest.fn()
    return expect(thunk(dispatch)).rejects.toEqual(new Error('Some error')).then(() => {
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
