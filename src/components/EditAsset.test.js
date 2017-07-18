import React from 'react'
import { shallow } from 'enzyme'

import { EditAsset } from './EditAsset.js'
import AssetForm from './AssetForm.js'
import { validAssetWithId1 } from '../data/fixtures/asset.js'

describe('EditAsset', () => {
  it('should pass Asset object to AssetForm component', () => {
    const props = {
      id: '73',
      asset: { status: 'loaded', object: validAssetWithId1 },
    }
    const wrapper = shallow(<EditAsset {...props} />)
    expect(wrapper.find(AssetForm).prop('asset')).toBe(validAssetWithId1)
  })

  it('should load Asset if uninitialised', () => {
    const dispatch = jest.fn()
    const assetActions = require('../actions/assets.js').default
    assetActions.loadAssets = jest.fn()
    const props = {
      id: '73',
      asset: { status: 'uninitialised' },
      dispatch,
    }
    shallow(<EditAsset {...props} />)
    expect(dispatch).toHaveBeenCalled()
    expect(assetActions.loadAssets).toHaveBeenCalled()
  })

  it('should save Asset when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const props = {
      id: '73',
      asset: { status: 'loaded', object: validAssetWithId1 },
      dispatch,
      history,
    }
    const assetActions = require('../actions/assets.js').default
    assetActions.putAsset = jest.fn()
    const wrapper = shallow(<EditAsset {...props} />)
    const handleSubmit = wrapper.find(AssetForm).prop('onSubmit')
    handleSubmit(validAssetWithId1)
    expect(dispatch).toHaveBeenCalled()
    expect(assetActions.putAsset).toHaveBeenCalledWith(validAssetWithId1)
  })

  it('should redirect to assets listing when handleSubmit is called', () => {
    jest.mock('../actions/assets.js')
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const props = {
      id: '73',
      asset: {
        status: 'loaded',
        object: validAssetWithId1,
      },
      dispatch,
      history,
    }
    const wrapper = shallow(<EditAsset {...props} />)
    const handleSubmit = wrapper.find(AssetForm).prop('onSubmit')
    handleSubmit(validAssetWithId1)
    expect(history.push).toHaveBeenCalledWith('/portfolio/assets')
  })
})
