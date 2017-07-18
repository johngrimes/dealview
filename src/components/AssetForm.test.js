import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import MockDate from 'mockdate'

import AssetForm from './AssetForm.js'
import {
  validAsset1,
  validAsset2,
  validAsset3,
} from '../data/fixtures/asset.js'

beforeEach(() => MockDate.set('2017-01-01'))
afterEach(() => MockDate.reset())

describe('AssetForm', () => {
  for (const asset of [ validAsset1, validAsset2, validAsset3 ]) {
    it(`should submit the entered data for ${asset.name}`, () => {
      const props = { onSubmit: jest.fn() }
      const wrapper = shallow(<AssetForm {...props} />)
      if (
        typeof asset.purchaseDate === 'string' ||
        typeof asset.purchaseAmount === 'number'
      ) {
        wrapper.find({ name: 'current' }).prop('onChange')(null, false)
      }
      for (const field in asset) {
        const fieldWrapper = wrapper.find({ name: field })
        fieldWrapper.prop('onChange')(asset[field])
      }
      wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() })
      expect(props.onSubmit).toHaveBeenCalledWith(asset)
    })
  }

  it('should be in current mode if a purchase date is present', () => {
    const props = { asset: validAsset3 }
    expect(typeof props.asset.purchaseDate).toBe('string')
    const wrapper = shallow(<AssetForm {...props} />)
    const fieldWrapper = wrapper.find({ name: 'purchaseDate' })
    expect(fieldWrapper.exists()).toBe(true)
  })

  it('should be in current mode if a purchase amount is present', () => {
    const props = { asset: validAsset3 }
    expect(typeof props.asset.purchaseAmount).toBe('string')
    const wrapper = shallow(<AssetForm {...props} />)
    const fieldWrapper = wrapper.find({ name: 'purchaseAmount' })
    expect(fieldWrapper.exists()).toBe(true)
  })

  it('should not be in current mode if purchase date and amount are absent', () => {
    const props = { asset: validAsset2 }
    expect(typeof props.asset.purchaseDate).toBe('undefined')
    expect(typeof props.asset.purchaseAmount).toBe('undefined')
    const wrapper = shallow(<AssetForm {...props} />)
    const fieldsExist = {
      purchaseDate: false,
      purchaseAmount: false,
      currentValue: true,
    }
    for (const field in fieldsExist) {
      const fieldWrapper = wrapper.find({ name: field })
      expect(fieldWrapper.exists()).toBe(fieldsExist[field])
    }
  })

  it('should not submit purchase details if current has been ticked', () => {
    const props = { asset: validAsset3, onSubmit: jest.fn() }
    expect(typeof props.asset.purchaseDate).toBe('string')
    expect(typeof props.asset.purchaseAmount).toBe('string')
    const wrapper = shallow(<AssetForm {...props} />)
    wrapper.find({ name: 'current' }).prop('onChange')(null, true)
    wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() })
    expect(props.onSubmit).toHaveBeenCalledWith(
      _.omit(props.asset, 'purchaseDate', 'purchaseAmount')
    )
  })

  const requiredFields = { name: {}, forecastGrowth: { name: 'Some asset' } }
  for (const field in requiredFields) {
    it(`should require a value in the ${field} field`, () => {
      const props = {
        asset: requiredFields[field],
        onSubmit: jest.fn(),
      }
      const wrapper = shallow(<AssetForm {...props} />)
      wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() })
      expect(props.onSubmit).not.toHaveBeenCalled()
      const fieldWrapper = wrapper.find({ name: field })
      expect(fieldWrapper.prop('errors').length).toBeGreaterThan(0)
      expect(fieldWrapper.prop('focus')).toBe(field)
      expect(fieldWrapper.prop('forceErrorDisplay')).toBe(true)
      expect(fieldWrapper).toMatchSnapshot()
    })
  }
})
