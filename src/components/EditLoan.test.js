import React from 'react'
import { shallow } from 'enzyme'

import { EditLoan } from './EditLoan.js'
import LoanForm from './LoanForm.js'
import { validLoanWithId1 } from '../data/fixtures/loan.js'

describe('EditLoan', () => {
  it('should render an existing Loan', () => {
    const props = {
      id: '73',
      loan: {
        status: 'loaded',
        object: validLoanWithId1,
      },
    }
    const wrapper = shallow(<EditLoan {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass Loan object to LoanForm component', () => {
    const props = {
      id: '73',
      loan: {
        status: 'loaded',
        object: validLoanWithId1,
      },
    }
    const wrapper = shallow(<EditLoan {...props} />)
    expect(wrapper.find(LoanForm).prop('loan')).toBe(validLoanWithId1)
  })

  it('should load Loan if uninitialised', () => {
    const dispatch = jest.fn()
    const loanActions = require('../actions/loans.js').default
    loanActions.loadLoans = jest.fn()
    const props = {
      id: '73',
      loan: {
        status: 'uninitialised',
      },
      dispatch,
    }
    shallow(<EditLoan {...props} />)
    expect(dispatch).toHaveBeenCalled()
    expect(loanActions.loadLoans).toHaveBeenCalled()
  })

  it('should save Loan when handleSubmit is called', () => {
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const props = {
      id: '73',
      loan: {
        status: 'loaded',
        object: validLoanWithId1,
      },
      dispatch,
      history,
    }
    const loanActions = require('../actions/loans.js').default
    loanActions.putLoan = jest.fn()
    const wrapper = shallow(<EditLoan {...props} />)
    const handleSubmit = wrapper.find(LoanForm).prop('onSubmit')
    handleSubmit(validLoanWithId1)
    expect(dispatch).toHaveBeenCalled()
    expect(loanActions.putLoan).toHaveBeenCalledWith(validLoanWithId1)
  })

  it('should redirect to liabilities listing when handleSubmit is called', () => {
    jest.mock('../actions/loans.js')
    const dispatch = jest.fn()
    const history = { push: jest.fn() }
    const props = {
      id: '73',
      loan: {
        status: 'loaded',
        object: validLoanWithId1,
      },
      dispatch,
      history,
    }
    const wrapper = shallow(<EditLoan {...props} />)
    const handleSubmit = wrapper.find(LoanForm).prop('onSubmit')
    handleSubmit(validLoanWithId1)
    expect(history.push).toHaveBeenCalledWith('/portfolio/liabilities')
  })
})
