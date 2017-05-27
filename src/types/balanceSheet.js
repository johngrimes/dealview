// @flow

import _ from 'lodash'
import moment from 'moment'
import type { Moment } from 'moment'

import { DateFormat } from 'types/commonTypes'
import { getValuationAtDate } from 'types/assets/asset'
import type { Asset, AssetMap } from 'types/assets/asset'
import type { LiabilityMap } from 'types/liabilities/liability'

export type BalanceSheet = {
  totalAssets: number,
  totalLiabilities: number,
  equity: number
}
export type BalanceSheetOverTime = { [date: string]: BalanceSheet }

export const balanceSheetOverTime = (assets: AssetMap, liabilities: LiabilityMap,
                                     startDate: string, endDate: string): BalanceSheetOverTime => {
  const startDay = moment(startDate, DateFormat)
  const endDay = moment(endDate, DateFormat)
  return calcBalanceSheet(assets, liabilities, startDay, endDay)
}

const calcBalanceSheet = (assets: AssetMap, liabilities: LiabilityMap,
                          date: Moment, endDate: Moment): BalanceSheetOverTime => {
  if (date.isAfter(endDate)) return {}
  const totalAssets = sumAssetValueAtDate(_.values(assets), date)
  const totalLiabilities = 0  // sumLiabilityValueAtDate(liabilities, date)
  const nextDate = moment(date).add(1, 'days')
  return { ...calcBalanceSheet(assets, liabilities, nextDate, endDate),
    [date.format(DateFormat)]: {
      totalAssets,
      totalLiabilities,
      equity: (totalAssets - totalLiabilities)
    }
  }
}

const sumAssetValueAtDate = (assets: Asset[], date: string): number => {
  if (assets.length === 0) return 0
  const { head, tail } = { head: _.head(assets), tail: _.tail(assets) }
  return getValuationAtDate(head, date) + sumAssetValueAtDate(tail, date)
}
