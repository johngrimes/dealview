export const LoanDefaults = {
  name: '',
  startDate: '',
  endDate: '',
  principal: 0,
  compoundingPeriod: 'daily',
  lengthInYears: 25,
  establishmentFees: 0,
  repaymentType: 'principalAndInterest',
}

export const loanToLiability = loan => {
  const liability = {}
  liability.type = 'Loan'
  liability.name = loan.name
  liability.startDate = loan.startDate
  liability.endDate = loan.endDate
  if (typeof loan.id === 'string') {
    liability.id = loan.id
  }
  return liability
}
