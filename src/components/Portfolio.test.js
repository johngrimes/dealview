import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import MockDate from 'mockdate'

import { Portfolio } from './Portfolio.js'
import DateSlider from './DateSlider.js'
import { validBalanceSheet1 } from '../data/fixtures/balanceSheet.js'
import { validAssets } from '../data/fixtures/asset.js'
import { validLiabilities } from '../data/fixtures/liability.js'
import { DateStorageFormat } from '../data/commonTypes.js'
import { InitialBalanceSheetState } from '../reducers/balanceSheet.js'
import { InitialAssetState } from '../reducers/assets.js'

describe('Portfolio', () => {
  const props = {
    balanceSheet: {
      status: 'loaded',
      fresh: true,
      balanceSheet: validBalanceSheet1,
    },
    assets: {
      status: 'loaded',
      objects: validAssets,
    },
    liabilities: {
      status: 'loaded',
      objects: validLiabilities,
    },
  }

  beforeEach(() => {
    MockDate.set('2017-01-01')
  })

  it('should render', () => {
    const wrapper = shallow(<Portfolio {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass correct props to DateSlider', () => {
    const wrapper = shallow(<Portfolio {...props} />)
    const dateSlider = wrapper.find(DateSlider)
    expect(dateSlider.prop('dates')).toEqual(Object.keys(validBalanceSheet1))
    expect(dateSlider.prop('selected')).toBe(moment().format(DateStorageFormat))
  })

  it('should pass correct props to DateSlider when balance sheet updates', () => {
    const initialProps = {
      balanceSheet: InitialBalanceSheetState,
      assets: InitialAssetState,
      dispatch: jest.fn(),
    }
    const wrapper = shallow(<Portfolio {...initialProps} />)
    wrapper.setProps(props)
    const dateSlider = wrapper.find(DateSlider)
    expect(dateSlider.prop('dates')).toEqual(Object.keys(validBalanceSheet1))
    expect(dateSlider.prop('selected')).toBe(moment().format(DateStorageFormat))
  })

  it('should update state when date changes', () => {
    const wrapper = shallow(<Portfolio {...props} />)
    const dateSlider = wrapper.find(DateSlider)
    dateSlider.prop('onChange')('2017-06-06')
    expect(wrapper.state('date')).toEqual('2017-06-06')
  })

  afterEach(() => {
    MockDate.reset()
  })
})
