import moment from 'moment'

export const getValuationAtDate = (asset, date) => {
  const now = moment().startOf('day')
  const startDate = asset.purchaseDate || now
  if (
    date.isBefore(startDate) ||
    (asset.saleDate && date.isAfter(asset.saleDate))
  ) {
    return 0
  }
  const daysSinceStart = Math.floor(
    moment.duration(date.diff(startDate)).asDays()
  )
  const startValue = asset.purchaseAmount
    ? parseInt(asset.purchaseAmount, 10)
    : parseInt(asset.currentValue, 10)
  const forecastGrowth = parseInt(asset.forecastGrowth, 10) / 10000 / 365
  return Math.round(startValue * Math.pow(1 + forecastGrowth, daysSinceStart))
}
