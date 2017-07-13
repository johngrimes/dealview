import React from 'react'
import { shallow } from 'enzyme'

import { CreateRealEstate } from './CreateRealEstate.js'
import RealEstateForm from './RealEstateForm.js'
import { validRealEstate1 } from '../data/fixtures/realEstate.js'

describe('CreateRealEstate', () => {
  it('should render', () => {
    const wrapper = shallow(<CreateRealEstate />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should put Real Estate when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const realEstateActions = require('../actions/realEstate').default
    realEstateActions.putRealEstate = jest.fn()
    const wrapper = shallow(
      <CreateRealEstate dispatch={dispatch} history={history} />
    )
    const handleSubmit = wrapper.find(RealEstateForm).prop('onSubmit')
    handleSubmit(validRealEstate1)
    expect(dispatch).toHaveBeenCalled()
    expect(realEstateActions.putRealEstate).toHaveBeenCalledWith(
      validRealEstate1
    )
  })

  it('should redirect to assets listing when handleSubmit is called', () => {
    jest.mock('../actions/realEstate')
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const wrapper = shallow(
      <CreateRealEstate dispatch={dispatch} history={history} />
    )
    const handleSubmit = wrapper.find(RealEstateForm).prop('onSubmit')
    handleSubmit(validRealEstate1)
    expect(history.push).toHaveBeenCalledWith('/portfolio/assets')
  })
})
