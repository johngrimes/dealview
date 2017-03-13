/* global expect */

import RealEstateForm from './RealEstateForm.js'
import type { RealEstateErrors } from './RealEstateForm.js'
import { RealEstateEmpty } from '../../../data/assets/realEstate.js'

import React from 'react'
import { mount } from 'enzyme'

describe('RealEstateForm', () => {
  it.only('should focus the first field with errors upon submission', () => {
    const wrapper = mount(<RealEstateForm />)
    wrapper.setState({
      values: {
        name: 'rover',
        address: { line3: 'a' }
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
        address: {},
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
        address: {},
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
