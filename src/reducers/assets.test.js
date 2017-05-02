/* global expect */

import AssetsReducer from './assets.js'
import * as AssetActions from '../actions/assets.js'
import { validAssetWithId1, validAssetWithId2 } from '../test/fixtures/asset.js'

describe('AssetsReducer', () => {
  const initialState = {
    status: 'loaded',
    objects: {
      [validAssetWithId1.id]: validAssetWithId1
    }
  }

  it('should update state upon request', () => {
    const actions = [
      AssetActions.putAssetRequest,
      AssetActions.deleteAssetRequest,
      AssetActions.loadAssetRequest
    ]
    actions.forEach(action => {
      const nextState = AssetsReducer(initialState, action())
      expect(nextState).toMatchSnapshot()
    })
  })

  it('should update state upon put success', () => {
    const action = AssetActions.putAssetSuccess(validAssetWithId2)
    const nextState = AssetsReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon delete success', () => {
    const action = AssetActions.deleteAssetSuccess(validAssetWithId1.id)
    const nextState = AssetsReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon load success', () => {
    const action = AssetActions.loadAssetSuccess({
      [validAssetWithId1.id]: validAssetWithId1,
      [validAssetWithId2.id]: validAssetWithId2
    })
    const nextState = AssetsReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon failure', () => {
    const actions = [
      AssetActions.putAssetFailure,
      AssetActions.deleteAssetFailure,
      AssetActions.loadAssetFailure
    ]
    actions.forEach(action => {
      const nextState = AssetsReducer(initialState, action('Some error'))
      expect(nextState).toMatchSnapshot()
    })
  })
})
