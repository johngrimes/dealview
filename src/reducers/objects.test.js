import { createObjectsReducer } from './objects.js'

describe('createObjectsReducer', () => {
  const validObject1 = {
    aspectA: 'foo',
    aspectB: 'bar',
  }
  const validObjectWithId1 = { ...validObject1, id: 'xyz123' }

  const validObject2 = {
    aspectA: 'grate',
    aspectB: 'pad',
  }
  const validObjectWithId2 = { ...validObject2, id: 'abc789' }

  const initialState = {
    status: 'loaded',
    objects: {
      [validObjectWithId1.id]: validObjectWithId1,
    },
  }

  const reducer = createObjectsReducer('RABBIT', 'RABBITS')

  it('should update state upon request', () => {
    const actions = [
      { type: 'PUT_RABBIT_REQUEST', object: validObject2 },
      { type: 'DELETE_RABBIT_REQUEST', id: 'xyz123' },
      { type: 'LOAD_RABBITS_REQUEST' },
    ]
    actions.forEach(action => {
      const nextState = reducer(initialState, action)
      expect(nextState).toMatchSnapshot()
    })
  })

  it('should update state upon put success', () => {
    const action = { type: 'PUT_RABBIT_SUCCESS', object: validObjectWithId2 }
    const nextState = reducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon delete success', () => {
    const action = { type: 'DELETE_RABBIT_SUCCESS', id: 'xyz123' }
    const nextState = reducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon load success', () => {
    const action = {
      type: 'LOAD_RABBITS_SUCCESS',
      objects: {
        [validObjectWithId1.id]: validObjectWithId1,
        [validObjectWithId2.id]: validObjectWithId2,
      },
    }
    const nextState = reducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon failure', () => {
    const actions = [
      { type: 'PUT_RABBIT_FAILURE', error: 'Something borked' },
      { type: 'DELETE_RABBIT_FAILURE', error: 'Flatlined' },
      { type: 'LOAD_RABBITS_FAILURE', error: 'No rabbits to be found' },
    ]
    actions.forEach(action => {
      const nextState = reducer(initialState, action)
      expect(nextState).toMatchSnapshot()
    })
  })
})
