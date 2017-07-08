// @flow

import type { Loan, LoanWithId } from 'types/liabilities/loan'

export const validLoan1: Loan = {
  name: '5SS Reno Loan',
  startDate: '2014-09-10',
  endDate: '2039-09-10',
  principal: 500000,
  compoundingPeriod: 'daily',
  lengthInYears: 25,
  establishmentFees: 1500,
  repaymentType: 'principalAndInterest',
}
export const validLoanWithId1: LoanWithId = { ...validLoan1, id: '345' }

export const validLoan2: Loan = {
  name: 'Briggs Primary',
  startDate: '2014-05-10',
  endDate: '2029-05-10',
  principal: 150000,
  compoundingPeriod: 'monthly',
  lengthInYears: 30,
  establishmentFees: 0,
  repaymentType: 'interestOnly',
}
export const validLoanWithId2: LoanWithId = { ...validLoan2, id: '832' }
