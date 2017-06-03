// @flow

import _ from 'lodash'
import moment from 'moment'
import type { Moment } from 'moment'

import { DateStorageFormat } from 'types/commonTypes'
import { getValuationAtDate } from 'types/assets/asset'
import type { Asset, AssetMap } from 'types/assets/asset'
import type { LiabilityMap } from 'types/liabilities/liability'

export type BalanceSheet = {
  +totalAssets: number,
  +totalLiabilities: number,
  +equity: number
}
export type BalanceSheetOverTime = { +[date: string]: BalanceSheet }

export const balanceSheetOverTime = (assets: AssetMap, liabilities: LiabilityMap,
                              startDate: Moment, endDate: Moment): BalanceSheetOverTime => {
  // The Array.from is a workaround for https://github.com/facebook/flow/issues/1059, and can be removed once this is resolved.
  return Object.assign({}, ...Array.from(calcBalanceSheet(assets, liabilities, startDate, endDate)))
}

function* calcBalanceSheet(assets: AssetMap, liabilities: LiabilityMap,
                           date: Moment, endDate: Moment): Generator<BalanceSheetOverTime, void, void> {
  let nextDate = date
  while (!nextDate.isAfter(endDate)) {
    const totalAssets = sumAssetValueAtDate(_.values(assets), nextDate)
    const totalLiabilities = 0  // sumLiabilityValueAtDate(liabilities, date)
    yield {
      [nextDate.format(DateStorageFormat)]: {
        totalAssets,
        totalLiabilities,
        equity: (totalAssets - totalLiabilities),
      },
    }
    nextDate = moment(nextDate).add(1, 'days')
  }
}

const sumAssetValueAtDate = (assets: Asset[], date: Moment): number => {
  if (assets.length === 0) return 0
  const { head, tail } = { head: _.head(assets), tail: _.tail(assets) }
  return getValuationAtDate(head, date) + sumAssetValueAtDate(tail, date)
}
