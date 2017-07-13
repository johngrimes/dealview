import _ from 'lodash'
import moment from 'moment'

import { DateStorageFormat } from './commonTypes.js'
import { getValuationAtDate } from './asset.js'

export const balanceSheetOverTime = (assets, liabilities, startDate, endDate) => {
  return Object.assign({}, ...calcBalanceSheet(assets, liabilities, startDate, endDate))
}

function * calcBalanceSheet(assets, liabilities, date, endDate) {
  let nextDate = date
  while (!nextDate.isAfter(endDate)) {
    const totalAssets = sumAssetValueAtDate(_.values(assets), nextDate)
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
  const { head, tail } = { head: _.head(assets), tail: _.tail(assets) }
  return getValuationAtDate(head, date) + sumAssetValueAtDate(tail, date)
}
