/* global expect */

import RealEstateReducer from 'reducers/assets/realEstate'
import RealEstateActions from 'actions/assets/realEstate'
import { validRealEstateWithId1, validRealEstateWithId2 } from 'fixtures/realEstate'

describe('RealEstateReducer', () => {
  const initialState = {
    status: 'loaded',
    objects: {
      [validRealEstateWithId1.id]: validRealEstateWithId1,
    },
  }

  it('should update state upon request', () => {
    const actions = [
      RealEstateActions.putRealEstateRequest,
      RealEstateActions.deleteRealEstateRequest,
      RealEstateActions.loadRealEstateRequest,
    ]
    actions.forEach(action => {
      const nextState = RealEstateReducer(initialState, action())
      expect(nextState).toMatchSnapshot()
    })
  })

  it('should update state upon put success', () => {
    const action = RealEstateActions.putRealEstateSuccess(validRealEstateWithId2)
    const nextState = RealEstateReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon delete success', () => {
    const action = RealEstateActions.deleteRealEstateSuccess(validRealEstateWithId1.id)
    const nextState = RealEstateReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon load success', () => {
    const action = RealEstateActions.loadRealEstateSuccess({
      [validRealEstateWithId1.id]: validRealEstateWithId1,
      [validRealEstateWithId2.id]: validRealEstateWithId2,
    })
    const nextState = RealEstateReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon failure', () => {
    const actions = [
      RealEstateActions.putRealEstateFailure,
      RealEstateActions.deleteRealEstateFailure,
      RealEstateActions.loadRealEstateFailure,
    ]
    actions.forEach(action => {
      const nextState = RealEstateReducer(initialState, action('Some error'))
      expect(nextState).toMatchSnapshot()
    })
  })
})
