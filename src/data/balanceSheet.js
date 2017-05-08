// @flow

import _ from 'lodash'
import moment from 'moment'
import type { Moment } from 'moment'

import { DateFormat } from '../data/commonTypes.js'
import { getValuationAtDate } from '../data/assets/asset.js'
import type { Asset, AssetMap } from '../data/assets/asset.js'
import type { LiabilityMap } from '../data/liabilities/liability.js'

export type BalanceSheet = {
  totalAssets: number,
  totalLiabilities: number,
  equity: number
}
export type BalanceSheetOverTime = { [date: string]: BalanceSheet }

export const balanceSheetOverTime = (assets: AssetMap, liabilities: LiabilityMap,
                                     startDate: string, endDate: string): BalanceSheetOverTime => {
  const startDay = moment(startDate, DateFormat).startOf('day')
  const endDay = moment(endDate, DateFormat).startOf('day')
  const days = getDaysWithinRange(startDay, endDay)
  return days.reduce((acc, day) => {
    const totalAssets = sumAssetValueAtDate(_.values(assets), day)
    const totalLiabilities = 0  // sumLiabilityValueAtDate(liabilities, day)
    return { ...acc,
      [day.format(DateFormat)]: {
        totalAssets,
        totalLiabilities,
        equity: (totalAssets - totalLiabilities)
      }
    }
  }, {})
}

const sumAssetValueAtDate = (assets: Asset[], date: string): number => {
  if (assets.length === 0) return 0
  const { head, tail } = { head: _.head(assets), tail: _.tail(assets) }
  return getValuationAtDate(head, date) + sumAssetValueAtDate(tail, date)
}

const getDaysWithinRange = (startDay: Moment, endDay: Moment): Moment[] => {
  const currentDay = moment(startDay)
  const moments = []
  while (!currentDay.isAfter(endDay)) {
    moments.push(moment(currentDay.add(1, 'days')))
  }
  return moments
}
