import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import RealEstateForm from './RealEstateForm.js'
import ValuationsInput from './ValuationsInput.js'
import {
  validRealEstate1,
  validRealEstate2,
} from '../data/fixtures/realEstate.js'
import { DateStorageFormat } from '../data/commonTypes.js'
import { RealEstateDefaults } from '../data/realEstate.js'

describe('RealEstateForm', () => {
  it('should render', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    expect(wrapper).toMatchSnapshot()
    const wrapper2 = shallow(<RealEstateForm realEstate={validRealEstate2} />)
    expect(wrapper2).toMatchSnapshot()
  })

  it('should pass valuations to ValuationsInput component', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    expect(wrapper.find(ValuationsInput).prop('valuations')).toBe(
      validRealEstate1.valuations
    )
  })

  it('should pass minimum date to ValuationsInput component when there is a purchase', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    const minDate = wrapper.find(ValuationsInput).prop('minDate')
    const expectedMinDate = moment(
      validRealEstate1.purchaseDate,
      DateStorageFormat
    ).add(1, 'd')
    expect(minDate.isSame(expectedMinDate)).toBe(true)
  })

  it('should pass maximum date to ValuationsInput component when there is a sale', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate2} />)
    const maxDate = wrapper.find(ValuationsInput).prop('maxDate')
    const expectedMaxDate = moment(
      validRealEstate2.saleDate,
      DateStorageFormat
    ).subtract(1, 'd')
    expect(maxDate.isSame(expectedMaxDate)).toBe(true)
  })

  it('should not pass minimum date to ValuationsInput when purchase has no date', () => {
    const realEstate = {
      ...validRealEstate1,
      valuations: [{ amount: 165000, note: 'Purchase price', type: 'purchase' }],
    }
    const wrapper = shallow(<RealEstateForm realEstate={realEstate} />)
    const minDate = wrapper.find(ValuationsInput).prop('minDate')
    expect(minDate).toBe(undefined)
  })

  it('should not pass maximum date to ValuationsInput when sale has no date', () => {
    const realEstate = {
      ...validRealEstate1,
      valuations: [{ amount: 340000, note: 'Sale price', type: 'sale' }],
    }
    const wrapper = shallow(<RealEstateForm realEstate={realEstate} />)
    const maxDate = wrapper.find(ValuationsInput).prop('maxDate')
    expect(maxDate).toBe(undefined)
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

  it('should update state when a field is focused', () => {
    const wrapper = shallow(<RealEstateForm />)
    wrapper.find({ name: 'name' }).prop('onFocus')('name')
    expect(wrapper.state('focusedInput')).toBe('name')
  })

  it('should show all errors upon submission', () => {
    const wrapper = shallow(<RealEstateForm />)
    wrapper.find('form').simulate('submit', { preventDefault() {} })
    expect(wrapper.state('allErrorsShown')).toEqual(true)
  })
})

describe('validation', () => {
  it('should require a purchase validation', () => {
    const realEstate = { ...validRealEstate1 }
    realEstate.valuations = realEstate.valuations.filter(
      v => v.type !== 'purchase'
    )
    const wrapper = shallow(<RealEstateForm realEstate={realEstate} />)
    expect(wrapper.find(ValuationsInput).prop('errors')).toMatchSnapshot()
  })

  it('should require valuations to be between purchase and sale dates', () => {
    const realEstate = { ...validRealEstate1 }
    realEstate.valuations = realEstate.valuations.concat([
      {
        date: '2014-09-09',
        amount: 460000,
        note: 'Some other valuation',
        type: 'none',
      },
    ])
    const wrapper = shallow(<RealEstateForm realEstate={realEstate} />)
    expect(wrapper.find(ValuationsInput).prop('errors')).toMatchSnapshot()
  })
})

describe('purchase and sale', () => {
  it('should update state when purchase date is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'purchaseDate' }).prop('onChange')('2016-05-14')
    expect(wrapper.state()).toMatchSnapshot()
  })

  it('should update state when purchase amount is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'purchaseAmount' }).prop('onChange')(350000)
    expect(wrapper.state()).toMatchSnapshot()
  })

  it('should update state when sale date is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'saleDate' }).prop('onChange')('2016-05-14')
    expect(wrapper.state()).toMatchSnapshot()
  })

  it('should update state when sale amount is changed', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    wrapper.find({ name: 'saleAmount' }).prop('onChange')(350000)
    expect(wrapper.state()).toMatchSnapshot()
  })

  it('should not add empty purchase and sale upon edit of a valuation', () => {
    const realEstate = RealEstateDefaults
    const wrapper = shallow(<RealEstateForm realEstate={realEstate} />)
    wrapper.find(ValuationsInput).prop('onChange')([{ amount: 1 }])
    expect(wrapper.state('realEstate').valuations).toHaveLength(1)
  })

  it('should set minimum on sale date when purchase is present', () => {
    const expected = moment('2005-05-10', DateStorageFormat).add(1, 'd')
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate2} />)
    expect(
      wrapper.find({ name: 'saleDate' }).prop('minDate').isSame(expected)
    ).toBe(true)
  })

  it('should set maximum on purchase date when sale is present', () => {
    const expected = moment('2017-01-01', DateStorageFormat).subtract(1, 'd')
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate2} />)
    expect(
      wrapper.find({ name: 'purchaseDate' }).prop('maxDate').isSame(expected)
    ).toBe(true)
  })
})
