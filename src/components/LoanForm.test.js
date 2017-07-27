import React from 'react'
import { shallow } from 'enzyme'
import omit from 'lodash.omit'

import LoanForm from './LoanForm.js'
import { validLoan1, validLoan2 } from '../data/fixtures/loan.js'

describe('LoanForm', () => {
  for (const loan of [ validLoan1, validLoan2 ]) {
    it(`should submit the entered data for ${loan.name}`, () => {
      const props = { onSubmit: jest.fn() }
      const wrapper = shallow(<LoanForm {...props} />)
      if (typeof loan.currentBalance !== 'number') {
        wrapper.find({ name: 'current' }).prop('onChange')(null, false)
      }
      for (const field in loan) {
        const fieldWrapper = wrapper.find({ name: field })
        fieldWrapper.prop('onChange')(loan[field])
      }
      wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() })
      expect(props.onSubmit).toHaveBeenCalledWith(loan)
    })
  }

  it('should be in current mode if current balance is present', () => {
    const props = { loan: validLoan1 }
    expect(typeof props.loan.currentBalance).toBe('number')
    const wrapper = shallow(<LoanForm {...props} />)
    const fieldWrapper = wrapper.find({ name: 'currentBalance' })
    expect(fieldWrapper.exists()).toBe(true)
  })

  it('should not be in current mode if start date is present', () => {
    const props = { loan: validLoan2 }
    expect(typeof props.loan.startDate).toBe('string')
    const wrapper = shallow(<LoanForm {...props} />)
    expect(wrapper.find({ name: 'currentBalance' }).exists()).toBe(false)
    expect(wrapper.find({ name: 'startDate' }).exists()).toBe(true)
    expect(wrapper.find({ name: 'principal' }).exists()).toBe(true)
    expect(wrapper.find({ name: 'establishmentFees' }).exists()).toBe(true)
  })

  it('should not submit establishment details if current has been ticked', () => {
    const props = { loan: validLoan2, onSubmit: jest.fn() }
    expect(typeof props.loan.startDate).toBe('string')
    expect(typeof props.loan.principal).toBe('number')
    expect(typeof props.loan.establishmentFees).toBe('number')
    const wrapper = shallow(<LoanForm {...props} />)
    wrapper.find({ name: 'current' }).prop('onChange')(null, true)
    wrapper.find({ name: 'currentBalance' }).prop('onChange')(12345)
    wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() })
    expect(props.onSubmit).toHaveBeenCalledWith(
      omit(
        { ...props.loan, currentBalance: 12345 },
        'startDate',
        'principal',
        'establishmentFees'
      )
    )
  })

  it('should require current balance when in current mode', () => {
    const props = {
      loan: { name: 'Some loan' },
      onSubmit: jest.fn(),
    }
    const wrapper = shallow(<LoanForm {...props} />)
    wrapper.find({ name: 'current' }).prop('onChange')(null, true)
    wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() })
    expect(props.onSubmit).not.toHaveBeenCalled()
    const fieldWrapper = wrapper.find({ name: 'currentBalance' })
    expect(fieldWrapper.prop('errors').length).toBeGreaterThan(0)
    expect(fieldWrapper.prop('focus')).toBe('currentBalance')
    expect(fieldWrapper.prop('forceErrorDisplay')).toBe(true)
    expect(fieldWrapper).toMatchSnapshot()
  })

  it('should require start date and principal when not in current mode', () => {
    const props = {
      loan: { name: 'Some loan' },
      onSubmit: jest.fn(),
    }
    const wrapper = shallow(<LoanForm {...props} />)
    wrapper.find({ name: 'current' }).prop('onChange')(null, false)
    wrapper.find('form').prop('onSubmit')({ preventDefault: jest.fn() })
    expect(props.onSubmit).not.toHaveBeenCalled()
    for (const fieldName of [ 'startDate', 'principal' ]) {
      const fieldWrapper = wrapper.find({ name: fieldName })
      expect(fieldWrapper.prop('errors').length).toBeGreaterThan(0)
      expect(fieldWrapper.prop('forceErrorDisplay')).toBe(true)
    }
  })
})
