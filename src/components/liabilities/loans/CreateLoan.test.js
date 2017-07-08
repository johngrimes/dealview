/* global expect */

import { CreateLoan } from 'components/liabilities/loans/CreateLoan'

import React from 'react'
import { shallow } from 'enzyme'

import LoanForm from 'components/liabilities/loans/LoanForm'
import { validLoan1 } from 'fixtures/loan'

describe('CreateLoan', () => {
  it('should render', () => {
    const wrapper = shallow(<CreateLoan />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should put Loan when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const loanActions = require('actions/liabilities/loans').default
    loanActions.putLoan = jest.fn()
    const wrapper = shallow(<CreateLoan dispatch={dispatch} history={history} />)
    const handleSubmit = wrapper.find(LoanForm).prop('onSubmit')
    handleSubmit(validLoan1)
    expect(dispatch).toHaveBeenCalled()
    expect(loanActions.putLoan).toHaveBeenCalledWith(validLoan1)
  })

  it('should redirect to liabilities listing when handleSubmit is called', () => {
    jest.mock('../../../actions/liabilities/loans')
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const wrapper = shallow(<CreateLoan dispatch={dispatch} history={history} />)
    const handleSubmit = wrapper.find(LoanForm).prop('onSubmit')
    handleSubmit(validLoan1)
    expect(history.push).toHaveBeenCalledWith('/portfolio/liabilities')
  })
})
