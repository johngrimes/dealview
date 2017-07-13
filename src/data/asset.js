import moment from 'moment'

import { DateStorageFormat } from './commonTypes.js'
import { compareValuationsByDate } from './valuations.js'

export const getValuationAtDate = (asset, date) => {
  const queryDate = date
  const startDate = moment(asset.startDate, DateStorageFormat)
  const endDate =
    typeof asset.endDate === 'string'
      ? moment(asset.endDate, DateStorageFormat)
      : undefined
  if (
    typeof asset.valuations === 'undefined' ||
    asset.valuations.length === 0 ||
    queryDate.isBefore(startDate) ||
    (endDate && queryDate.isAfter(endDate))
  ) {
    return 0
  }
  const sortedValuations = asset.valuations
    .slice()
    .sort(compareValuationsByDate)
  const idxFuture = sortedValuations.findIndex(v => {
    return moment(v.date, DateStorageFormat).valueOf() > queryDate.valueOf()
  })
  const slicedValuations =
    idxFuture === -1 ? sortedValuations : sortedValuations.slice(0, idxFuture)
  const amount =
    typeof slicedValuations[slicedValuations.length - 1] === 'undefined'
      ? 0
      : slicedValuations[slicedValuations.length - 1].amount
  return typeof amount === 'number' ? amount : 0
}
