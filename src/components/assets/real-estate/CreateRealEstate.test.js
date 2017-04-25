/* global expect */

import { CreateRealEstate } from './CreateRealEstate.js'

import React from 'react'
import { shallow } from 'enzyme'

import RealEstateForm from './RealEstateForm.js'
import { validRealEstate1 } from '../../../test/fixtures/realEstate.js'

describe('CreateRealEstate', () => {
  it('should render', () => {
    const wrapper = shallow(<CreateRealEstate />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should put Real Estate when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const realEstateActions = require('../../../actions/realEstate.js')
    realEstateActions.putRealEstate = jest.fn()
    const wrapper = shallow(<CreateRealEstate dispatch={dispatch} />)
    const handleSubmit = wrapper.find(RealEstateForm).prop('onSubmit')
    handleSubmit(validRealEstate1)
    expect(dispatch).toHaveBeenCalled()
    expect(realEstateActions.putRealEstate).toHaveBeenCalledWith(validRealEstate1)
  })
})
