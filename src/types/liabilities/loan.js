// @flow

import type { Liability } from 'types/liabilities/liability'

export type Loan = {
  +name: string,
  +startDate: string,
  +endDate: string
}

export type LoanWithId = Loan & { +id: string }

export type LoanMap = { +[id: string]: LoanWithId }

export const LoanDefaults = {
  name: '',
  startDate: '',
  endDate: '',
}

export const loanToLiability = (loan: Loan): Liability => {
  const liability = {}
  liability.type = 'Loan'
  liability.name = loan.name
  liability.startDate = loan.startDate
  liability.endDate = loan.endDate
  if (typeof loan.id === 'string') { liability.id = loan.id }
  return liability
}
