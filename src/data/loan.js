import moment from 'moment'

export const LoanDefaults = {
  interestRate: 400,
  compoundingPeriod: 'daily',
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

export const getBalanceAtDate = (loan, date) => {
  if (typeof loan !== 'object') {
    throw new TypeError(`getBalanceAtDate: loan (${loan}) is not an object`)
  }
  if (!(moment.isMoment(date) && date.isValid())) {
    throw new TypeError(
      `getBalanceAtDate: date (${date}) is not a valid Moment`
    )
  }
  const now = moment().startOf('day')
  const startDate = loan.startDate ? moment(loan.startDate) : now
  const endDate = loan.endDate ? moment(loan.endDate) : null
  if (date.isBefore(startDate) || (endDate && date.isAfter(endDate))) {
    return 0
  }
  const daysSinceStart = Math.floor(
    moment.duration(date.diff(startDate)).asDays()
  )
  const daysToLoanEnd = Math.floor(
    moment.duration(endDate.diff(startDate)).asDays()
  )
  const startValue = loan.principal
    ? parseInt(loan.principal, 10)
    : parseInt(loan.currentBalance, 10)
  const interestRate = parseInt(loan.interestRate, 10) / 10000 / 365
  const repayment =
    interestRate *
    startValue /
    (1 - Math.pow(1 + interestRate, daysToLoanEnd * -1))
  const fvOfOriginalBalance =
    startValue * Math.pow(1 + interestRate, daysSinceStart)
  const fvOfAnnuity =
    repayment *
    ((Math.pow(1 + interestRate, daysSinceStart) - 1) / interestRate)
  return Math.round(fvOfOriginalBalance - fvOfAnnuity)
}
