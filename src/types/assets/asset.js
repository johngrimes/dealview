// @flow

import moment from 'moment'

import { DateFormat } from 'types/commonTypes'
import type { Valuations, Valuation } from 'components/forms/ValuationsInput'

export type Asset = {
  type: 'RealEstate',
  instanceId: string,
  name: string,
  startDate: string,
  endDate?: string,
  valuations: Valuations
}

export type AssetWithId = Asset & { id: string }

export type AssetMap = { [id: string]: AssetWithId }

export const getValuationAtDate = (asset: { startDate: string, endDate?: string, valuations: Valuations },
                                   date: string): number => {
  const queryDate = moment(date)
  const startDate = moment(asset.startDate)
  const endDate = typeof asset.endDate === 'string'
    ? moment(asset.endDate)
    : undefined
  if (typeof asset.valuations === 'undefined' ||
      asset.valuations.length === 0 ||
      queryDate.isBefore(startDate) ||
      (endDate && queryDate.isAfter(endDate))) {
    return 0
  }
  const sortedValuations = asset.valuations.slice().sort(compareValuationsByDate)
  const idxFuture = sortedValuations.findIndex(v => {
    return moment(v.date, DateFormat).valueOf() > queryDate.valueOf()
  })
  const slicedValuations = idxFuture === -1
    ? sortedValuations
    : sortedValuations.slice(0, idxFuture)
  const amount = typeof slicedValuations[slicedValuations.length - 1] === 'undefined'
    ? 0
    : slicedValuations[slicedValuations.length - 1].amount
  return typeof amount === 'number' ? amount : 0
}

const compareValuationsByDate = (a: Valuation, b: Valuation): number => {
  const [ milliA, milliB ] = [ a, b ].map(v => { return v.date ? moment(v.date).valueOf() : 0 })
  return milliA - milliB
}
