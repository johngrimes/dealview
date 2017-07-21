import values from 'lodash.values'
import arrayHead from 'lodash.head'
import arrayTail from 'lodash.tail'
import moment from 'moment'

import { DateStorageFormat } from './commonTypes.js'
import { getValuationAtDate } from './asset.js'

export const balanceSheetOverTime = (
  assets,
  liabilities,
  startDate,
  endDate
) => {
  return Object.assign(
    {},
    ...calcBalanceSheet(assets, liabilities, startDate, endDate)
  )
}

function * calcBalanceSheet(assets, liabilities, date, endDate) {
  let nextDate = date
  while (!nextDate.isAfter(endDate)) {
    const totalAssets = sumAssetValueAtDate(values(assets), nextDate)
    const totalLiabilities = 0 // sumLiabilityValueAtDate(liabilities, date)
    yield {
      [nextDate.format(DateStorageFormat)]: {
        totalAssets,
        totalLiabilities,
        equity: totalAssets - totalLiabilities,
      },
    }
    nextDate = moment(nextDate).add(1, 'days')
  }
}

const sumAssetValueAtDate = (assets, date) => {
  if (assets.length === 0) return 0
  const { head, tail } = { head: arrayHead(assets), tail: arrayTail(assets) }
  const headResult = getValuationAtDate(head, date)
  return headResult + sumAssetValueAtDate(tail, date)
}
