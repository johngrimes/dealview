/* global expect */

import { ListAssets } from './ListAssets.js'

import React from 'react'
import { shallow } from 'enzyme'

import { validAssetWithId1, validAssetWithId2 } from '../../test/fixtures/asset.js'
import { loadAssets } from '../../actions/assets.js'

describe('ListAssets', () => {
  it('should render some Assets', () => {
    const props = {
      assets: {
        status: 'loaded',
        objects: {
          [validAssetWithId1.id]: validAssetWithId1,
          [validAssetWithId2.id]: validAssetWithId2
        }
      }
    }
    const wrapper = shallow(<ListAssets {...props} />)
    expect(wrapper.find('.asset').length).toBe(Object.keys(props.assets).length)
    expect(wrapper).toMatchSnapshot()
  })

  it('should load Assets if uninitialised', () => {
    const dispatch = jest.fn()
    const assetActions = require('../../actions/assets.js')
    assetActions.loadAssets = jest.fn()
    const props = {
      assets: {
        status: 'uninitialised',
        objects: {}
      },
      dispatch
    }
    const wrapper = shallow(<ListAssets {...props} />)
    expect(dispatch).toHaveBeenCalled()
    expect(assetActions.loadAssets).toHaveBeenCalled()
  })
})
