import React from 'react'
import { shallow } from 'enzyme'

import LoanForm from './LoanForm.js'
import { validLoan1, validLoan2 } from '../data/fixtures/loan.js'

describe('LoanForm', () => {
  it('should render', () => {
    const wrapper = shallow(<LoanForm loan={validLoan1} />)
    expect(wrapper).toMatchSnapshot()
    const wrapper2 = shallow(<LoanForm loan={validLoan2} />)
    expect(wrapper2).toMatchSnapshot()
  })

  it('should focus the first field with errors upon submission', () => {
    const wrapper = shallow(<LoanForm />)
    wrapper.find({ name: 'name' }).prop('onChange')('ab')
    wrapper.find('form').simulate('submit', { preventDefault() {} })
    expect(wrapper.state('focusedInput')).toEqual('name')
  })

  it('should show all errors upon submission', () => {
    const wrapper = shallow(<LoanForm />)
    wrapper.find('form').simulate('submit', { preventDefault() {} })
    expect(wrapper.state('allErrorsShown')).toEqual(true)
  })
})
