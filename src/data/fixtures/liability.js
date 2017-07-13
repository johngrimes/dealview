import type { Liability, LiabilityWithId } from 'types/liabilities/liability'

export const validLiability1: Liability = {
  type: 'Loan',
  name: '5SS Reno Loan',
  startDate: '2014-09-10',
  endDate: '2039-09-10',
}
export const validLiabilityWithId1: LiabilityWithId = {
  ...validLiability1,
  id: '345',
}

export const validLiability2: Liability = {
  type: 'Loan',
  name: 'Briggs Primary',
  startDate: '2014-05-10',
  endDate: '2029-05-10',
}
export const validLiabilityWithId2: LiabilityWithId = {
  ...validLiability2,
  id: '832',
}

export const validLiabilities = {
  [validLiabilityWithId1.id]: validLiabilityWithId1,
  [validLiabilityWithId2.id]: validLiabilityWithId2,
}
