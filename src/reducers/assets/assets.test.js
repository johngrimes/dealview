/* global expect */

import AssetsReducer from 'reducers/assets/assets'
import AssetActions from 'actions/assets/assets'
import { validAssetWithId1, validAssetWithId2 } from 'fixtures/asset'

describe('AssetsReducer', () => {
  const initialState = {
    status: 'loaded',
    objects: {
      [validAssetWithId1.id]: validAssetWithId1,
    },
  }

  it('should update state upon request', () => {
    const actions = [
      AssetActions.putAssetRequest,
      AssetActions.deleteAssetRequest,
      AssetActions.loadAssetsRequest,
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
    const action = AssetActions.loadAssetsSuccess({
      [validAssetWithId1.id]: validAssetWithId1,
      [validAssetWithId2.id]: validAssetWithId2,
    })
    const nextState = AssetsReducer(initialState, action)
    expect(nextState).toMatchSnapshot()
  })

  it('should update state upon failure', () => {
    const actions = [
      AssetActions.putAssetFailure,
      AssetActions.deleteAssetFailure,
      AssetActions.loadAssetsFailure,
    ]
    actions.forEach(action => {
      const nextState = AssetsReducer(initialState, action('Some error'))
      expect(nextState).toMatchSnapshot()
    })
  })
})
