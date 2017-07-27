import moment from 'moment'
import MockDate from 'mockdate'

import { getBalanceAtDate } from './loan.js'
import { DateStorageFormat } from './commonTypes.js'
import { validLoan1, validLoan2 } from './fixtures/loan.js'

beforeEach(() => {
  MockDate.set('2017-01-01')
})
afterEach(() => {
  MockDate.reset()
})

describe('getBalanceAtDate', () => {
  it('should get the correct balance', () => {
    const expectedBals = [
      [ validLoan1, '2018-01-01', 486210 ],
      [ validLoan2, '2020-05-01', 137843 ],
    ]
    for (const bal of expectedBals) {
      const loan = { ...bal[0] }
      const balance = getBalanceAtDate(loan, moment(bal[1], DateStorageFormat))
      expect(balance).toEqual(bal[2])
    }
  })

  it('should throw an error if the loan is not an object', () => {
    expect(() => {
      getBalanceAtDate(undefined, moment())
    }).toThrow()
  })

  it('should throw an error if the date is not a valid moment', () => {
    expect(() => {
      getBalanceAtDate(validLoan1, '2017-07-26')
    }).toThrow()
  })
})
