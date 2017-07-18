import moment from 'moment'
import MockDate from 'mockdate'

import { getValuationAtDate } from './asset.js'
import { DateStorageFormat } from './commonTypes.js'
import { validAsset1, validAsset2, validAsset3 } from './fixtures/asset.js'

beforeEach(() => {
  MockDate.set('2017-01-01')
})
afterEach(() => {
  MockDate.reset()
})

describe('getValuationAtDate', () => {
  it('should get the correct valuation', () => {
    const expectedVals = [
      [ validAsset1, '2019-05-03', 878193 ],
      [ validAsset2, '2018-11-29', 593590 ],
      [ validAsset3, '2024-05-02', 392728 ],
    ]
    for (const val of expectedVals) {
      const asset = { ...val[0] }
      const valuation = getValuationAtDate(
        asset,
        moment(val[1], DateStorageFormat)
      )
      expect(valuation).toEqual(val[2])
    }
  })

  it('should return zero if selected date is before today', () => {
    const asset = { ...validAsset1 }
    const valuation = getValuationAtDate(
      asset,
      moment('1988-04-13', DateStorageFormat)
    )
    expect(valuation).toEqual(0)
  })

  it('should return zero if selected date is before today', () => {
    const asset = { ...validAsset3 }
    const valuation = getValuationAtDate(
      asset,
      moment('2020-04-15', DateStorageFormat)
    )
    expect(valuation).toEqual(0)
  })

  it('should return zero if selected date is after sale date', () => {
    const asset = { ...validAsset2 }
    const valuation = getValuationAtDate(
      asset,
      moment('2020-04-15', DateStorageFormat)
    )
    expect(valuation).toEqual(0)
  })
})
