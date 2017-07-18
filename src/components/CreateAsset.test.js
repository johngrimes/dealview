import React from 'react'
import { shallow } from 'enzyme'

import { CreateAsset } from './CreateAsset.js'
import AssetForm from './AssetForm.js'
import { validAsset1 } from '../data/fixtures/asset.js'

describe('CreateAsset', () => {
  it('should put Real Estate when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const realEstateActions = require('../actions/assets.js').default
    realEstateActions.putAsset = jest.fn()
    const wrapper = shallow(
      <CreateAsset dispatch={dispatch} history={history} />
    )
    const handleSubmit = wrapper.find(AssetForm).prop('onSubmit')
    handleSubmit(validAsset1)
    expect(dispatch).toHaveBeenCalled()
    expect(realEstateActions.putAsset).toHaveBeenCalledWith(validAsset1)
  })

  it('should redirect to assets listing when handleSubmit is called', () => {
    jest.mock('../actions/assets.js')
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const wrapper = shallow(
      <CreateAsset dispatch={dispatch} history={history} />
    )
    const handleSubmit = wrapper.find(AssetForm).prop('onSubmit')
    handleSubmit(validAsset1)
    expect(history.push).toHaveBeenCalledWith('/portfolio/assets')
  })
})
