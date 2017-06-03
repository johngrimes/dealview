/* global expect */

import moment from 'moment'

import { balanceSheetOverTime } from 'types/balanceSheet'
import { validAssetWithId1, validAssetWithId2 } from 'fixtures/asset'
import { DateStorageFormat } from 'types/commonTypes'

describe('balanceSheetOverTime', () => {
  const assets = {
    [validAssetWithId1.id]: validAssetWithId1,
    [validAssetWithId2.id]: validAssetWithId2,
  }
  const liabilities = {}

  it('should return correct results', () => {
    window.onmessage = () => {}
    const result = balanceSheetOverTime(
      assets,
      liabilities,
      moment('2014-01-01', DateStorageFormat),
      moment('2017-01-01', DateStorageFormat),
    )
    expect(result).toMatchSnapshot()
  })
})
