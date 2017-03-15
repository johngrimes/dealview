/* global expect */

jest.mock('../../../data/database.js', () => {
  return {
    save: (objectStore, values) => {
      return new Promise((resolve) => { resolve() })
    }
  }
})

import RealEstateForm from './RealEstateForm.js'
import type { RealEstateErrors } from './RealEstateForm.js'
import { RealEstateEmpty } from '../../../data/assets/realEstate.js'
import { AddressEmpty } from '../../../data/commonTypes.js'

import React from 'react'
import { mount } from 'enzyme'

describe('RealEstateForm', () => {
  it.only('should focus the first field with errors upon submission', () => {
    const wrapper = mount(<RealEstateForm />)
    wrapper.setState({
      values: {
        name: 'rover',
        address: {
          line1: '',
          line2: '',
          line3: 'a',
          locality: '',
          state: '',
          postcode: ''
        },
        valuations: []
      }
    })
    wrapper.find('form').simulate('submit')
    expect(wrapper.state('focusedInput')).toEqual('address-line3')
  })

  it('should show all errors upon submission', () => {
    const wrapper = mount(<RealEstateForm />)
    wrapper.setState({
      values: RealEstateEmpty,
      errors: {
        name: [],
        address: AddressEmpty,
        notes: ['has incorrect grammar in it']
      },
      allErrorsShown: false,
      focusedInput: 'name'
    })
    wrapper.find('button').simulate('click')
    expect(wrapper.state('allErrorsShown')).toEqual(true)
  })

  describe('findFirstErrorFieldName', () => {
    it('should return the name of the first field with errors', () => {
      const errors: RealEstateErrors = {
        name: [],
        address: AddressEmpty,
        notes: ['has incorrect grammar in it']
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
          line3: []
        },
        notes: []
      }
      const result = RealEstateForm.findFirstErrorFieldName(errors)
      expect(result).toEqual('address-line2')
    })
  })
})
