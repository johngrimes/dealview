import React from 'react'
import { shallow } from 'enzyme'

import { CreateLoan } from './CreateLoan.js'
import LoanForm from './LoanForm.js'
import { validLoan1 } from '../data/fixtures/loan.js'

describe('CreateLoan', () => {
  it('should render', () => {
    const wrapper = shallow(<CreateLoan />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should put Loan when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const loanActions = require('../actions/loans.js').default
    loanActions.putLoan = jest.fn()
    const wrapper = shallow(
      <CreateLoan dispatch={dispatch} history={history} />
    )
    const handleSubmit = wrapper.find(LoanForm).prop('onSubmit')
    handleSubmit(validLoan1)
    expect(dispatch).toHaveBeenCalled()
    expect(loanActions.putLoan).toHaveBeenCalledWith(validLoan1)
  })

  it('should redirect to liabilities listing when handleSubmit is called', () => {
    jest.mock('../actions/loans.js')
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const wrapper = shallow(
      <CreateLoan dispatch={dispatch} history={history} />
    )
    const handleSubmit = wrapper.find(LoanForm).prop('onSubmit')
    handleSubmit(validLoan1)
    expect(history.push).toHaveBeenCalledWith('/portfolio/liabilities')
  })
})
