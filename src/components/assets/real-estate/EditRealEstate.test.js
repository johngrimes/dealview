/* global expect */

import React from 'react'
import { shallow } from 'enzyme'

import { EditRealEstate } from 'components/assets/real-estate/EditRealEstate'
import RealEstateForm from 'components/assets/real-estate/RealEstateForm'
import { validRealEstateWithId1 } from 'fixtures/realEstate'

describe('EditRealEstate', () => {
  it('should render an existing Real Estate asset', () => {
    const props = {
      id: '73',
      realEstate: {
        status: 'loaded',
        object: validRealEstateWithId1,
      },
    }
    const wrapper = shallow(<EditRealEstate {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass Real Estate object to RealEstateForm component', () => {
    const props = {
      id: '73',
      realEstate: {
        status: 'loaded',
        object: validRealEstateWithId1,
      },
    }
    const wrapper = shallow(<EditRealEstate {...props} />)
    expect(wrapper.find(RealEstateForm).prop('realEstate')).toBe(validRealEstateWithId1)
  })

  it('should load Real Estate if uninitialised', () => {
    const dispatch = jest.fn()
    const realEstateActions = require('actions/realEstate')
    realEstateActions.loadRealEstate = jest.fn()
    const props = {
      id: '73',
      realEstate: {
        status: 'uninitialised',
      },
      dispatch,
    }
    shallow(<EditRealEstate {...props} />)
    expect(dispatch).toHaveBeenCalled()
    expect(realEstateActions.loadRealEstate).toHaveBeenCalled()
  })

  it('should save Real Estate when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const props = {
      id: '73',
      realEstate: {
        status: 'loaded',
        object: validRealEstateWithId1,
      },
      dispatch,
    }
    const realEstateActions = require('actions/realEstate')
    realEstateActions.putRealEstate = jest.fn()
    const wrapper = shallow(<EditRealEstate {...props} />)
    const handleSubmit = wrapper.find(RealEstateForm).prop('onSubmit')
    handleSubmit(validRealEstateWithId1)
    expect(dispatch).toHaveBeenCalled()
    expect(realEstateActions.putRealEstate).toHaveBeenCalledWith(validRealEstateWithId1)
  })
})
