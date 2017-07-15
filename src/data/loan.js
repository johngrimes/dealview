export const LoanDefaults = {
  interestRate: 400,
  compoundingPeriod: 'daily',
  lengthInYears: 25,
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
