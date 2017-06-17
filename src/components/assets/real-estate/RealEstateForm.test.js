/* global expect */

import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import RealEstateForm from 'components/assets/real-estate/RealEstateForm'
import ValuationsInput from 'components/forms/ValuationsInput/ValuationsInput'
import { AddressEmpty } from 'types/commonTypes'
import { validRealEstate1, validRealEstate2 } from 'fixtures/realEstate'
import type { RealEstateErrors } from 'components/assets/real-estate/RealEstateForm'

describe('RealEstateForm', () => {
  it('should render', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    expect(wrapper).toMatchSnapshot()
    const wrapper2 = shallow(<RealEstateForm realEstate={validRealEstate2} />)
    expect(wrapper2).toMatchSnapshot()
  })

  it('should pass valuations to ValuationsInput component', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    expect(wrapper.find(ValuationsInput).prop('valuations'))
      .toBe(validRealEstate1.valuations)
  })

  it('should focus the first field with errors upon submission', () => {
    const wrapper = shallow(<RealEstateForm />)
    wrapper.find({ name: 'name' }).prop('onChange')('rover')
    wrapper.find({ name: 'address' }).prop('onChange')({
      line1: '',
      line2: '',
      line3: 'a',
      locality: '',
      state: '',
      postcode: '',
    })
    wrapper.find('form').simulate('submit', { preventDefault() {} })
    expect(wrapper.state('focusedInput')).toEqual('address-line3')
  })

  it('should show all errors upon submission', () => {
    const wrapper = shallow(<RealEstateForm />)
    wrapper.find('form').simulate('submit', { preventDefault() {} })
    expect(wrapper.state('allErrorsShown')).toEqual(true)
  })
})

describe('findFirstErrorFieldName', () => {
  it('should return the name of the first field with errors', () => {
    const errors: RealEstateErrors = {
      name: [],
      address: AddressEmpty,
      notes: ['has incorrect grammar in it'],
    }
    const result = RealEstateForm.findFirstErrorFieldName(errors)
    expect(result).toEqual('notes')
  })

  it('should return a field within a complex input', () => {
    const errors: RealEstateErrors = {
      name: [],
      address: {
        line1: [],
        line2: ["is not anywhere I've ever heard of"],
        line3: [],
      },
      notes: [],
    }
    const result = RealEstateForm.findFirstErrorFieldName(errors)
    expect(result).toEqual('address-line2')
  })
})

describe('validation', () => {
  it('should require a purchase validation', () => {
    const realEstate = _.cloneDeep(validRealEstate1)
    realEstate.valuations = realEstate.valuations.filter(v => v.type !== 'purchase')
    const wrapper = shallow(<RealEstateForm realEstate={realEstate} />)
    expect(wrapper.find(ValuationsInput).prop('errors'))
      .toMatchSnapshot()
  })

  it('should require valuations to be between purchase and sale dates', () => {
    const realEstate = _.cloneDeep(validRealEstate1)
    realEstate.valuations.push({
      date: '2014-09-09', amount: 460000, note: 'Some other valuation', type: 'none',
    })
    const wrapper = shallow(<RealEstateForm realEstate={realEstate} />)
    expect(wrapper.find(ValuationsInput).prop('errors'))
      .toMatchSnapshot()
  })
})

describe('purchase and sale', () => {
  it('should update valuations when purchase date is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'purchaseDate' }).prop('onChange')('2016-05-14')
    expect(wrapper.state('purchase')).toMatchSnapshot()
  })

  it('should update valuations when purchase amount is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'purchaseAmount' }).prop('onChange')(350000)
    expect(wrapper.state('purchase')).toMatchSnapshot()
  })

  it('should update valuations when sale date is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'saleDate' }).prop('onChange')('2016-05-14')
    expect(wrapper.state('sale')).toMatchSnapshot()
  })

  it('should update valuations when sale amount is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'saleAmount' }).prop('onChange')(350000)
    expect(wrapper.state('sale')).toMatchSnapshot()
  })
})
