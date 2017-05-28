/* global expect */

import React from 'react'
import { shallow } from 'enzyme'

import RealEstateForm from 'components/assets/real-estate/RealEstateForm'
import ValuationsInput from 'components/forms/ValuationsInput'
import { AddressEmpty } from 'types/commonTypes'
import { validRealEstate1 } from 'fixtures/realEstate'
import type { RealEstateErrors } from 'components/assets/real-estate/RealEstateForm'

describe('RealEstateForm', () => {
  it('should render', () => {
    const wrapper = shallow(<RealEstateForm realEstate={validRealEstate1} />)
    expect(wrapper).toMatchSnapshot()
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
