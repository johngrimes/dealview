/* global expect */

import { CreateRealEstate } from 'components/assets/real-estate/CreateRealEstate'

import React from 'react'
import { shallow } from 'enzyme'

import RealEstateForm from 'components/assets/real-estate/RealEstateForm'
import * as RealEstateActions from 'actions/realEstate'
import { validRealEstate1 } from 'fixtures/realEstate'

describe('CreateRealEstate', () => {
  it('should render', () => {
    const wrapper = shallow(<CreateRealEstate />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should put Real Estate when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const wrapper = shallow(<CreateRealEstate dispatch={dispatch} />)
    const handleSubmit = wrapper.find(RealEstateForm).prop('onSubmit')
    handleSubmit(validRealEstate1)
    expect(dispatch).toHaveBeenCalledWith(RealEstateActions.putRealEstateRequest(validRealEstate1))
  })
})
