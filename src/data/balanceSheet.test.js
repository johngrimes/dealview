import moment from 'moment'
import pick from 'lodash.pick'

import { balanceSheetOverTime } from './balanceSheet.js'
import { DateStorageFormat } from './commonTypes.js'
import { validAssetWithId1, validAssetWithId2 } from './fixtures/asset.js'
import { validLoanWithId1, validLoanWithId2 } from './fixtures/loan.js'

describe('balanceSheetOverTime', () => {
  const assets = {
    [validAssetWithId1.id]: validAssetWithId1,
    [validAssetWithId2.id]: validAssetWithId2,
  }
  const loans = {
    [validLoanWithId1.id]: validLoanWithId1,
    [validLoanWithId2.id]: validLoanWithId2,
  }

  it('should return correct results', () => {
    window.onmessage = () => {}
    const result = balanceSheetOverTime(
      assets,
      loans,
      moment('2019-08-20', DateStorageFormat),
      moment('2025-01-05', DateStorageFormat)
    )
    const prunedResult = pick(
      result,
      '2019-08-20',
      '2019-08-21',
      '2019-08-24',
      '2019-08-25',
      '2019-08-26',
      '2021-05-09',
      '2021-05-10',
      '2021-05-11',
      '2024-12-31',
      '2025-01-01',
      '2025-01-02',
      '2025-01-05'
    )
    expect(prunedResult).toMatchSnapshot()
  })
})
