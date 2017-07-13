import moment from 'moment'

import { balanceSheetOverTime } from './balanceSheet.js'
import { DateStorageFormat } from './commonTypes.js'
import { validAssetWithId1, validAssetWithId2 } from './fixtures/asset.js'

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
      moment('2017-01-01', DateStorageFormat)
    )
    expect(result).toMatchSnapshot()
  })
})
