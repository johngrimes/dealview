/* global expect */

import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import MockDate from 'mockdate'

import { Portfolio } from 'components/Portfolio/Portfolio'
import DateSlider from 'components/DateSlider/DateSlider'
import { validBalanceSheet1 } from 'fixtures/balanceSheet'
import { DateStorageFormat } from 'types/commonTypes'
import { InitialBalanceSheetState } from 'reducers/balanceSheet'
import { InitialAssetState } from 'reducers/assets'

describe('Portfolio', () => {
  const props = {
    balanceSheet: {
      status: 'loaded',
      fresh: true,
      balanceSheet: validBalanceSheet1,
    },
    assets: {
      status: 'loaded',
      objects: {},
    },
  }

  beforeEach(() => {
    MockDate.set('2017-01-01')
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

  afterEach(() => {
    MockDate.reset()
  })
})
